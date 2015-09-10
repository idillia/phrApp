angular.module('starter', ['ionic', 'chat', 'firebase', 'editHand', 'underscore'])

// for ui-router
.run(["$rootScope", "$state", function($rootScope, $state) {
$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $state.go("home");
  }
});
}])

// app.config(["$stateProvider", function ($stateProvider) {
// $stateProvider
//   .state("home", {
//     // the rest is the same for ui-router and ngRoute...
//     controller: "HomeCtrl",
//     templateUrl: "views/home.html",
//     resolve: {
//       // controller will not be loaded until $waitForAuth resolves
//       // Auth refers to our $firebaseAuth wrapper in the example above
//       "currentAuth": ["Auth", function(Auth) {
//         // $waitForAuth returns a promise so the resolve waits for it to complete
//         return Auth.$waitForAuth();
//       }]
//     }
//   })
//   .state("account", {
//     // the rest is the same for ui-router and ngRoute...
//     controller: "AccountCtrl",
//     templateUrl: "views/account.html",
//     resolve: {
//       // controller will not be loaded until $requireAuth resolves
//       // Auth refers to our $firebaseAuth wrapper in the example above
//       "currentAuth": ["Auth", function(Auth) {
//         // $requireAuth returns a promise so the resolve waits for it to complete
//         // If the promise is rejected, it will throw a $stateChangeError (see above)
//         return Auth.$requireAuth();
//       }]
//     }
//   });
// }]);

// app.controller("HomeCtrl", ["currentAuth", function(currentAuth) {
//   // currentAuth (provided by resolve) will contain the
//   // authenticated user or null if not logged in
// }]);

// app.controller("AccountCtrl", ["currentAuth", function(currentAuth) {
//   // currentAuth (provided by resolve) will contain the
//   // authenticated user or null if not logged in
// }])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/edithand');

    $stateProvider.state('app', {
      url:'/app',
      abstract:true,
      templateUrl: "js/sideMenu/sideMenu.html",
      controller: 'AuthCtrl'
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'js/auth/login.html',
          controller: 'AuthCtrl'
        }
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          templateUrl: '',
          contreller: 'AuthCtrl'
        }
      }
    })
    .state('app.editHand', {
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
    .state('signup', {
    url: '/signup',
    views: {
      chat: {
        templateUrl: 'js/auth/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('app.viewHand', {
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
  Auth.$onAuth(function(authData){
    if (authData === null) {
    console.log("Not logged in yet");
  } else {
    console.log("Logged in as", authData.uid);
  }
  $scope.authData = authData;
    })
  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").catch(function(error){
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
  this.user = ref.getAuth();

  var saveNewUser = function(userObj) {
    ref.child('users').child(userObj.id).set(userObj);
  };
  this.isLoggedIn = function(){
    return !!ref.getAuth();
  };
  this.loginWithPW = function(userObj, cb, cbOnReg){
    ref.authWithPassword(userId, function(err, authData){
      if (err) {
        console.log("Error");
      } else {
        authData.email = userObj.email;
        this.user = authData;
        cb(authData);
        cbOnReg && cbOnReg(true);
      }
    }.bind(this))
  }
  return $firebaseAuth(ref);

})


