// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })
.factory('chatMessages', ['$firebaseArray', function($firebaseArray){
  var ref = new Firebase("https://phr.firebaseio.com");
  return $firebaseArray(ref);
  // return $firebaseArray(ref.limitToLast(10)).$asArray();

}])
.controller('chatController', ['$scope', 'chatMessages', function($scope, chatMessages){
  $scope.messages = chatMessages;
  $scope.message = {};
  $scope.addMessage = function(message) {
    console.log("submiting");
    $scope.messages.$add({content: message});
    $scope.message.theMessage = "";
  };

}]);
