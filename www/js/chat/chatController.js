angular.module('chat', [])

.factory('chatMessages', ['$firebaseArray', function($firebaseArray){
  var ref = new Firebase("https://phr.firebaseio.com/" + 'chat');
  return $firebaseArray(ref);
  // return $firebaseArray(ref.limitToLast(10)).$asArray();

}])
.controller('chatCtrl', ['$scope', 'chatMessages', function($scope, chatMessages){
  $scope.messages= chatMessages;
  $scope.message = {};
  console.log($scope);
  $scope.addMessage = function(message) {
    console.log("submiting message");
    $scope.messages.$add({content: message});
    $scope.message.theMessage= "";
  }
}]);


