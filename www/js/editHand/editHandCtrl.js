angular.module('editHand', []) 

.factory('editHandRecords', ['$firebaseArray', function($firebaseArray){
  var ref = new Firebase("https://phr.firebaseio.com/" + 'handrecords');
  return $firebaseArray(ref);
}]) 

.controller('editHandCtrl', ['$scope', 'editHandRecords', function($scope, editHandRecords){
  $scope.hands = editHandRecords;
  $scope.hand = {};
  $scope.table = new PHR.Table();
  $scope.addHand = function(hand) {
    console.log("submiting hand");
    $scope.hands.$add({content: hand});
    $scope.hand.theHand = "";
  }
  $scope.handKeypad = function() {
    console.log("cell was clicked");
  }

  $scope.cardRanksNumeric = ["10", "9", "8", "7", "6", "5", "4", "3", "2"];
  $scope.cardRanks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  $scope.cardSuits = ['\u2660','\u2665', '\u2663', '\u2666'];
}])

.controller('DeckKeyboardCtrl', function($scope) {
  function cardDeck() {
    var ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
    var suits = ['\u2660','\u2665', '\u2663', '\u2666'];
    var rankSuits;
    var fiftyTwo = [];
    for (var s in suits) {
      for( var r in ranks) {
        fiftyTwo.push(ranks[r]+suits[s]);       
      };       
    }; 
    return fiftyTwo;    
  }
  var deck = cardDeck();
  var container = [];

  for (var i = 0; i < 52; i++) {
  if (i % 13 == 0) {
    var row = [];
  }

  row.push(deck[i]);
  
  if (i != 0 && ((i+1) % 13) == 0) {
      container.push(row);
    }
  }
  $scope.cardDeck = container;
})

.controller('modalKeypadCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('js/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.deckModal.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})