angular.module('chat', [])

.controller("chatCtrl", ["$scope", "$firebaseArray", "Auth", "$rootScope", "$ionicScrollDelegate", function($scope, $firebaseArray, Auth, $rootScope, $ionicScrollDelegate) {
   var ref = new Firebase("https://phr.firebaseio.com/messages");
  // create a synchronized array
  $scope.messages = $firebaseArray(ref);
  $scope.auth = Auth;
  // any time auth status updates, add the user data to scope
  $scope.auth.$onAuth(function(authData) {
    $rootScope.authData = authData;
  });
  $scope.newMessageText = "";
   // add new items to the array
   // the message is automatically added to our Firebase database!
  $scope.addMessage = function(newMessageText) {
    console.log($rootScope.name);
    console.log($rootScope.authData.facebook);
    if ($rootScope.authData.facebook !== undefined) {
    $scope.messages.$add({
      name: $rootScope.authData.facebook.displayName,
      text: newMessageText,
      photo: $rootScope.authData.facebook.profileImageURL,
      date: Firebase.ServerValue.TIMESTAMP
     });
    } else {
      $scope.messages.$add({
      // name: $rootScope.name,
      text: newMessageText,
      photo: $rootScope.authData.password.profileImageURL,
      date: Firebase.ServerValue.TIMESTAMP
     });
    }
    $ionicScrollDelegate.scrollBottom();
    $scope.newMessageText='';
  }; 
}]);



