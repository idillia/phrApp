// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

$stateProvider.state('editHand', {
  url: '/edithand',
  views: {
    editHand: {
      templateUrl: 'js/editHand/editHand.html'
    }
  }
});

$stateProvider.state('viewHand', {
  url: '/viewhand',
  views: {
    viewHand: {
      templateUrl: 'js/viewHand/viewHand.html'
    }
  }
});

$stateProvider.state('chat', {
  url: '/chat',
  views: {
    chat: {
      templateUrl: 'js/chat/chat.html'
    }
  }
});
});


