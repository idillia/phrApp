angular.module('chat', [])

.factory('chatMessages', ['$firebaseArray', function($firebaseArray){
  var ref = new Firebase("https://phr.firebaseio.com");
  return $firebaseArray(ref);
  // return $firebaseArray(ref.limitToLast(10)).$asArray();

}])
.controller('chatCtrl', ['$scope', 'chatMessages', function($scope, chatMessages){
  $scope.messages = chatMessages;
  $scope.message = {};
  $scope.addMessage = function(message) {
    console.log("submiting");
    $scope.messages.$add({content: message});
    $scope.message.theMessage = "";
  }
}]);


