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
}]);