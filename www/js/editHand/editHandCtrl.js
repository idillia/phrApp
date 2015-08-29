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
}])

.controller('modalKeypadCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('js/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
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
});