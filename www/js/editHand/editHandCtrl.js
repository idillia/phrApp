angular.module('editHand', []) 

// .factory('editHandRecords', ['$firebaseArray', function($firebaseArray){
//   var ref = new Firebase("https://phr.firebaseio.com/" + 'handrecords');
//   return $firebaseArray(ref);
// }]) 

.controller('editHandCtrl', ['$scope','$ionicModal', function($scope, $ionicModal){
  // $scope.hands = editHandRecords;
  // $scope.hand = {};
  // $scope.table = new PHR.Table();
  // $scope.addHand = function(hand) {
  //   console.log("submiting hand");
  //   $scope.hands.$add({content: hand});
  //   $scope.hand.theHand = "";
  // }

  $scope.table = new PHR.Table();
  $scope.board = new PHR.Board();
  console.log($scope.board.board);
  $scope.date = new Date().getTime();
  var fireref = new Firebase("https://phr.firebaseio.com/" + 'handrecords/' + $scope.date);


  $scope.cardRanks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  $scope.cardSuits = ['\u2660','\u2665', '\u2663', '\u2666'];


  // Cards custom keypad when inputing in table.hand

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
  };
 // Number custom keypad when inputing in table.action
  $ionicModal.fromTemplateUrl('js/keypads/actionKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.actionModal = modal;
    $scope.modalVal = [];
  });
  $scope.openActionModal = function(row, col) {
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.actionModal.show();
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;  
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
    $scope.modalVal = [];
  };
  $scope.closeActionModal = function() {
    $scope.modalVal = [];
    $scope.actionModal.hide();
  };
  $scope.buttonActionModal = function(val) {
    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;
  };

  // Number custom keypad when inputing in table.stack
  $ionicModal.fromTemplateUrl('js/keypads/stackKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.stackModal = modal;
  });
  $scope.openStackModal = function(row, col) {
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.stackModal.show();
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.stack[$scope.openCol].value = $scope.numbers;  
      }
    };
    $scope.moveNext = function() {
      $scope.modalVal = [];
      $scope.openCol++;
      if ($scope.openCol <= 8) {
        $scope.table.stack[$scope.openCol].value = $scope.numbers;  
      } else return;
    };
  };
  $scope.eraseStackModal = function() {
    $scope.modalVal = [];
  };
  $scope.closeStackModal = function() {
    $scope.modalVal = [];
    $scope.stackModal.hide();
  };
  $scope.buttonStackModal = function(val) {
    console.log($scope.modalVal)
    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.stack[$scope.openCol].value = $scope.numbers;
  };

  // Cards custom keypad when inputing in board.board
  $ionicModal.fromTemplateUrl('js/keypads/cardsBoardKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.boardModal = modal;
  });
  $scope.openBoardModal = function(row, col) {
    console.log("open bord model")
    $scope.openCol = col;
    $scope.boardModal.show();
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.board.board[$scope.openCol].value = $scope.modalVal;  
      }
    };
    $scope.moveNext = function() {
      $scope.openCol++;
      if ($scope.openCol <= 4 ) {
        $scope.board.board[$scope.openCol].value = $scope.modalVal;
 
      } else return;
    };
  };
  $scope.closeBoardModal = function() {
    $scope.boardModal.hide();
  };
  $scope.buttonBoardModal = function(rank, suit) {
  while ($scope.openCol <=4){ 
    $scope.modalVal = rank+suit;
    $scope.board.board[$scope.openCol].value = $scope.modalVal;
    delete $scope.modalVal;
    $scope.moveNext();
  } $scope.closeBoardModal();
  };

  // Save hand information to firebase
  $scope.saveHands = function() {
    console.log("saving hands...")
    $scope.date = new Date().getTime();
    fireref.set(JSON.stringify($scope.date, $scope.table), function(error) {
      if (error) {console.log("failed to save")}
      else {console.log("saved successfuly")}
    });
  };
}]);



