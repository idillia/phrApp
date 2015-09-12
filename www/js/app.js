angular.module('starter', ['ionic', 'chat', 'firebase', 'editHand', 'underscore'])

// for ui-router
.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
}])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
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
          // resolve: {
          //   // controller will not be loaded until $waitForAuth resolves
          //   // Auth refers to our $firebaseAuth wrapper in the example above
          //   "currentAuth": ["Auth", function(Auth) {
          //     // $waitForAuth returns a promise so the resolve waits for it to complete
          //     return Auth.$waitForAuth();
          //   }]
          // }
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
    //        resolve: {
    //   // controller will not be loaded until $requireAuth resolves
    //   // Auth refers to our $firebaseAuth wrapper in the example above
    //   "currentAuth": ["Auth", function(Auth) {
    //     // $requireAuth returns a promise so the resolve waits for it to complete
    //     // If the promise is rejected, it will throw a $stateChangeError (see above)
    //     return Auth.$requireAuth();
    //   }]
    // }
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
.controller('AuthCtrl', function($scope,$state, Auth, $rootScope) {
  Auth.$onAuth(function(authData) {
    if(authData === null){
      console.log("no data"); 
      $state.go('login');
    } else {
      $state.go('app.edithand')
    $scope.authData = authData;
    // console.log($scope.authData);
  }
  });
  $rootScope.uid = null;
  $scope.loginWithFacebook = function() {
    Auth.$authWithOAuthPopup("facebook")
      .then(function(authData){
        console.log(authData)
        $rootScope.uid = authData.uid;
        console.log($rootScope.uid)
        console.log("Authenticated successfully with payload:", authData.uid)
      })
      .catch(function(error){
        console.log("Auth failed:", error);
      });
  };
  $scope.loginWithPassword = function(email, password) {
    Auth.$authWithPassword({
      email    : email,
      password : password
    })
    .then(function(authData){
      $rootScope.uid = authData.uid;
      console.log("Authenticated successfully with password:", authData.uid)
    })
    .catch(function(error){
      console.log("Auth failed:", error);
    });
  };

  $scope.logout = function() {
    console.log("user loggedout");
    Auth.$unauth();
  };
})

.controller('signupCtrl', function($scope, $state, Auth) {
  Auth.$onAuth(function(authData) {
    if(authData === null){
      console.log("no data"); 
    } else {
      $state.go('app.edithand')
      $scope.authData = authData;
      console.log($scope.authData);
    }
  });
  $scope.signup = function(name, email, password){  
    Auth.$createUser({
      name: name,
      email: email,
      password: password
    })
    .then(function(userData){
      console.log("User ", userData, " created successfully!");
      return Auth.$authWithPassword({
        name: name,
        email: email,
        password: password
      });  
    })
    .then(function(authData){
      saveUserToDB(authData);
      console.log("Logged in as: ", authData);
    })
    .catch(function(error){
      console.log("Error: ", error);
    });
  }
  $scope.signupWithFacebook = function() {
    Auth.$authWithOAuthPopup("facebook")
      .then(function(authData){
        saveUserToDB(authData);
        console.log("Authenticated successfully with payload:", authData.uid)
      })
      .catch(function(error){
        console.log("Auth failed:", error);
      });
  };  
  var saveUserToDB = function(authData) {
    console.log("auth inside saveuser", authData)
    var isNewUser = true;
    var ref = new Firebase("https://phr.firebaseio.com");
    Auth.$onAuth(function(authData) {
      if (authData && isNewUser) {
        // save the user's profile into the database so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData)
        });
      }
    });
  // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email.replace(/@.*/, '');
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
      }
    }
  };
})  
.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://phr.firebaseio.com/");
   console.log(ref);
   console.log($firebaseAuth(ref));
  return $firebaseAuth(ref);
})
// .factory("Users", function(){
// });


