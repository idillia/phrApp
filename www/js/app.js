angular.module('starter', ['ionic', 'chat', 'firebase', 'editHand', 'underscore'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
      url:'/app',
      abstract:true,
      templateUrl: "js/sideMenu/sideMenu.html"
    })
    .state('editHand', {
      url: '/edithand',
      views: {
        'editHand': {
          templateUrl: 'js/editHand/editHand.html',
          controller: 'editHandCtrl'
        }
      }
    })
    .state('signup', {
    url: '/signup',
    views: {
      chat: {
        templateUrl: 'js/auth/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('viewHand', {
    cache: false,
    url: '/viewhand',
    views: {
      viewHand: {
        templateUrl: 'js/viewHand/viewHand.html',
        controller: 'editHandCtrl'
      }
    }
  })

  .state('chat', {
    url: '/chat',
    views: {
      chat: {
        templateUrl: 'js/chat/chat.html',
        controller: 'chatCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',
    views: {
      chat: {
        templateUrl: 'js/auth/login.html',
        controller: 'AuthCtrl'
      }
    }
  })

})
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



.controller('AuthCtrl', function($scope, Auth) {
  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      console.log(authData);
    }).catch(function(error){
      console.log(error);
    });
  }
  $scope.logout = function() {
    Auth.$unauth();
  }
})

.controller('signupCtrl', function($scope) {
})

.factory("Auth", function($firebaseAuth){
  var ref = new Firebase("https://phr.firebaseio.com/");
  return $firebaseAuth(ref);
})


