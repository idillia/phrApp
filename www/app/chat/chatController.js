angular.module('chat', [])

.controller("chatCtrl", ["$scope", "$firebaseArray", "Auth", "$rootScope", function($scope, $firebaseArray, Auth, $rootScope) {
   var ref = new Firebase("https://phr.firebaseio.com/messages");
  // create a synchronized array
  $scope.messages = $firebaseArray(ref);
  $scope.auth = Auth;
  // any time auth status updates, add the user data to scope
  $scope.auth.$onAuth(function(authData) {
    $rootScope.authData = authData;
  });
  console.log($rootScope.authData.facebook.profileImageURL);

   // add new items to the array
   // the message is automatically added to our Firebase database!
   $scope.addMessage = function(mes) {
    console.log("fire");
     $scope.messages.$add({
      name: $rootScope.authData.facebook.displayName,
      text: mes,
      photo: $rootScope.authData.facebook.profileImageURL
     });
   }; 
  
}]);



