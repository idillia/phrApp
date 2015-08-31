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
  var fireref = new Firebase("https://phr.firebaseio.com/" + 'handrecords');


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
  };

  $scope.saveHands = function() {
    console.log("saving hands...")
    fireref.set(JSON.stringify($scope.table), function(error) {
      if (error) {console.log("failed to save")}
      else {console.log("saved successfuly")}
    })
  }
}]);



"{\"COLUMNS\":9,\"ROWS\":6,\"rows\":6,\"col\":9,\"hand\":[{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:15\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:16\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:17\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:18\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:19\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:20\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:21\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:22\"},{\"card1\":\"\",\"card2\":\"\",\"$$hashKey\":\"object:23\"}],\"stack\":[{\"value\":\"\",\"$$hashKey\":\"object:53\"},{\"value\":\"\",\"$$hashKey\":\"object:54\"},{\"value\":\"\",\"$$hashKey\":\"object:55\"},{\"value\":\"\",\"$$hashKey\":\"object:56\"},{\"value\":\"\",\"$$hashKey\":\"object:57\"},{\"value\":\"\",\"$$hashKey\":\"object:58\"},{\"value\":\"\",\"$$hashKey\":\"object:59\"},{\"value\":\"\",\"$$hashKey\":\"object:60\"},{\"value\":\"\",\"$$hashKey\":\"object:61\"}],\"action\":[[{\"value\":\"1\",\"$$hashKey\":\"object:99\"},{\"value\":\"2\",\"$$hashKey\":\"object:100\"},{\"value\":\"\",\"$$hashKey\":\"object:101\"},{\"value\":\"\",\"$$hashKey\":\"object:102\"},{\"value\":\"\",\"$$hashKey\":\"object:103\"},{\"value\":\"\",\"$$hashKey\":\"object:104\"},{\"value\":\"\",\"$$hashKey\":\"object:105\"},{\"value\":\"\",\"$$hashKey\":\"object:106\"},{\"value\":\"\",\"$$hashKey\":\"object:107\"}],[{\"value\":\"\",\"$$hashKey\":\"object:126\"},{\"value\":\"\",\"$$hashKey\":\"object:127\"},{\"value\":\"\",\"$$hashKey\":\"object:128\"},{\"value\":\"\",\"$$hashKey\":\"object:129\"},{\"value\":\"\",\"$$hashKey\":\"object:130\"},{\"value\":\"\",\"$$hashKey\":\"object:131\"},{\"value\":\"\",\"$$hashKey\":\"object:132\"},{\"value\":\"\",\"$$hashKey\":\"object:133\"},{\"value\":\"\",\"$$hashKey\":\"object:134\"}],[{\"value\":\"\",\"$$hashKey\":\"object:153\"},{\"value\":\"\",\"$$hashKey\":\"object:154\"},{\"value\":\"\",\"$$hashKey\":\"object:155\"},{\"value\":\"\",\"$$hashKey\":\"object:156\"},{\"value\":\"\",\"$$hashKey\":\"object:157\"},{\"value\":\"\",\"$$hashKey\":\"object:158\"},{\"value\":\"\",\"$$hashKey\":\"object:159\"},{\"value\":\"\",\"$$hashKey\":\"object:160\"},{\"value\":\"\",\"$$hashKey\":\"object:161\"}],[{\"value\":\"\",\"$$hashKey\":\"object:180\"},{\"value\":\"\",\"$$hashKey\":\"object:181\"},{\"value\":\"\",\"$$hashKey\":\"object:182\"},{\"value\":\"\",\"$$hashKey\":\"object:183\"},{\"value\":\"\",\"$$hashKey\":\"object:184\"},{\"value\":\"\",\"$$hashKey\":\"object:185\"},{\"value\":\"\",\"$$hashKey\":\"object:186\"},{\"value\":\"\",\"$$hashKey\":\"object:187\"},{\"value\":\"\",\"$$hashKey\":\"object:188\"}],[{\"value\":\"\",\"$$hashKey\":\"object:207\"},{\"value\":\"\",\"$$hashKey\":\"object:208\"},{\"value\":\"\",\"$$hashKey\":\"object:209\"},{\"value\":\"\",\"$$hashKey\":\"object:210\"},{\"value\":\"\",\"$$hashKey\":\"object:211\"},{\"value\":\"\",\"$$hashKey\":\"object:212\"},{\"value\":\"\",\"$$hashKey\":\"object:213\"},{\"value\":\"\",\"$$hashKey\":\"object:214\"},{\"value\":\"\",\"$$hashKey\":\"object:215\"}],[{\"value\":\"\",\"$$hashKey\":\"object:234\"},{\"value\":\"\",\"$$hashKey\":\"object:235\"},{\"value\":\"\",\"$$hashKey\":\"object:236\"},{\"value\":\"\",\"$$hashKey\":\"object:237\"},{\"value\":\"\",\"$$hashKey\":\"object:238\"},{\"value\":\"\",\"$$hashKey\":\"object:239\"},{\"value\":\"\",\"$$hashKey\":\"object:240\"},{\"value\":\"\",\"$$hashKey\":\"object:241\"},{\"value\":\"\",\"$$hashKey\":\"object:242\"}]]}"
