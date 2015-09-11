angular.module('starter', ['ionic', 'chat', 'firebase', 'editHand', 'underscore'])

// for ui-router
.run(["$rootScope", "$state", function($rootScope, $state) {
$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $state.go("app.login");
  }
});
}])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/edithand');

    $stateProvider.state('app', {
      url:'/app',
      abstract:true,
      templateUrl: "js/sideMenu/sideMenu.html",
      controller: 'AuthCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/auth/login.html',
      controller: 'AuthCtrl'

    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'js/auth/signup.html',
      controller: 'signupCtrl'

  })
    .state('logout', {
      url: '/logout',
          templateUrl: '',
          contreller: 'AuthCtrl'

    })
    .state('app.edithand', {
      url: '/edithand',
      views: {
        'menuContent': {
          templateUrl: 'js/editHand/editHand.html',
          controller: 'editHandCtrl',
          resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $waitForAuth returns a promise so the resolve waits for it to complete
              return Auth.$waitForAuth();
            }]
          }
        }
      }
    })
  .state('app.viewhand', {
    cache: false,
    url: '/viewhand',
    views: {
      'menuContent': {
        templateUrl: 'js/viewHand/viewHand.html',
        controller: 'editHandCtrl',
           resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
      }
    }
  })

  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'js/chat/chat.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'js/user/profile.html',
        controller: 'AuthCtrl',
        resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
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



.controller('AuthCtrl', function($scope,$state, Auth) {
  Auth.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with uid:", authData.uid);
  
  $scope.user = {};
  $scope.createUser = function() {
    $scope.message = null;
    $scope.error = null;

    Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    }).then(function(userData) {
      $scope.message = "User created with uid: " + userData.uid;
    }).catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").catch(function(error){
      console.log(error);
    });
  };
  $scope.logout = function() {
    Auth.$unauth();
  }
  } else {
    console.log("Client unauthenticated.")
  }
})
})

.controller('signupCtrl', function($scope) {
})

.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://phr.firebaseio.com/");
   console.log(ref);
   console.log($firebaseAuth(ref));
  return $firebaseAuth(ref);
});


