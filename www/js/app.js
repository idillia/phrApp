angular.module('starter', ['ionic', 'firebase', 'chat'])

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
      templateUrl: 'js/chat/chat.html',
      controller: 'chatCtrl'
    }
  }
});
});


