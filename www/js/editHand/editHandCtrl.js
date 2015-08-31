angular.module('editHand', []) 

.factory('editHandRecords', ['$firebaseArray', function($firebaseArray){
  var ref = new Firebase("https://phr.firebaseio.com/" + 'handrecords');
  return $firebaseArray(ref);
}]) 

.controller('editHandCtrl', ['$scope', 'editHandRecords', '$ionicModal', function($scope, editHandRecords, $ionicModal){
  $scope.hands = editHandRecords;
  $scope.hand = {};
  $scope.table = new PHR.Table();
  $scope.addHand = function(hand) {
    console.log("submiting hand");
    $scope.hands.$add({content: hand});
    $scope.hand.theHand = "";
  }
  $scope.cardRanks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  $scope.cardSuits = ['\u2660','\u2665', '\u2663', '\u2666'];

  $ionicModal.fromTemplateUrl('js/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.deckModal = modal;
  });

  $scope.openDeckModal = function(row, col) {
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.deckModal.show();
    
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
      }
    };
    $scope.moveNext = function() {
      $scope.openCol++;
      if ($scope.openCol <= 8) {
        console.log($scope.openCol);
        $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
      } else return;
    };
  };
  $scope.closeDeckModal = function() {
    $scope.table.hand[$scope.openCol].value = $scope.modalVal;
    $scope.deckModal.hide();
  };

  $scope.buttonDeckModal = function(rank, suit) {
    $scope.modalVal = rank+suit;

    if (typeof $scope.modalCard1 === 'undefined') {
        $scope.modalCard1 = rank+suit;  
    }
    else {
        $scope.modalCard2 = rank+suit;
        $scope.table.hand[$scope.openCol] = new PHR.HandCell($scope.modalCard1, $scope.modalCard2);
        // console.log('card1: ' + $scope.table.hand[$scope.openCol].card1 + " , card2: " + $scope.table.hand[$scope.openCol].card2);
        delete $scope.modalCard1;
        delete $scope.modalCard2;
        $scope.moveNext();  
    }
  }

  $ionicModal.fromTemplateUrl('js/keypads/actionKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.actionModal = modal;
    $scope.modalVal = [];
  });

  $scope.openActionModal = function(row, col) {
    // console.log(row);
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.actionModal.show();
    
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.action[$scope.openCol].value = $scope.modalVal;  
      }
    };
    $scope.moveNext = function() {
      $scope.modalVal = [];
      $scope.openCol++;
      if ($scope.openCol <= 8) {
        $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;  
      } else return;
    };
  };

  $scope.eraseActionModal = function() {
    // console.log($scope.table.action[$scope.openRow][$scope.openCol]);
    // console.log("erasing");
    $scope.modalVal = [];
    // console.log($scope.table.action[$scope.openRow][$scope.openCol]);
  };

  $scope.closeActionModal = function() {
    $scope.modalVal = [];
    $scope.actionModal.hide();
  };
  $scope.buttonActionModal = function(val) {

    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;
    
    console.log($scope.table.action[$scope.openRow][$scope.openCol])
    console.log("row: ", $scope.openRow, "col: ", $scope.openCol)
    console.log($scope.table.action)
  }
}]);
