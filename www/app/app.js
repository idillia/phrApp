angular.module('starter', ['ionic', 'chat', 'firebase', 'editHand', 'underscore', 'ngAnimate', 'toastr', 'profile'])

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
      templateUrl: "app/sideMenu/sideMenu.html",
      controller: 'AuthCtrl'
  })
  .state('login', {
    url: '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthCtrl'
  })
  .state('signup', {
    url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'signupCtrl'
  })
  .state('logout', {
    url: '/logout',
      templateUrl: '',
      contreller: 'AuthCtrl'
  })
  .state('app.edithand', {
    cache: false,
    url: '/edithand',
    views: {
      'menuContent': {
        templateUrl: 'app/editHand/editHand.html',
        controller: 'editHandCtrl',
      }
    }
  })
  .state('app.viewhand', {
    cache: false,
    url: '/viewhand',
    views: {
      'menuContent': {
        templateUrl: 'app/viewHand/viewHand.html',
        controller: 'editHandCtrl',
      }
    }
  })
  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'app/chat/chat.html',
        controller: 'chatCtrl'
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'app/user/profile.html',
        controller: 'profileCtrl'
      }
    }
  });
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('AuthCtrl', function($scope,$state, Auth, $rootScope, $ionicHistory, toastr) {
  Auth.$onAuth(function(authData) {
    if (authData === null){
      console.log("no data"); 
      $state.go('login');
    } else {
      $state.go('app.edithand');
    $scope.authData = authData;
    // console.log($scope.authData);
  }
  });
  $rootScope.uid = null;

  var checkIfUserInDB = function(uid, callback){
    var ref = new Firebase("https://phr.firebaseio.com");
    ref.child("users").child(uid).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      callback(uid, exists);
    });
  };

  $scope.loginWithFacebook = function() {
    Auth.$authWithOAuthPopup("facebook")
      .then(function(authData){
        checkIfUserInDB(authData.uid, function(uid, exists){
          if (!exists) {
            $scope.saveUserToDB(authData);
            console.log($rootScope.uid);
            console.log("Authenticated successfully with payload:", authData.uid);
          }
        })
      })
      .catch(function(error){
        console.log("Auth failed:", error);
        toastr.error(error.code, 'Error');
      });
  };
  $scope.loginWithPassword = function(email, password) {
    Auth.$authWithPassword({
      email    : email,
      password : password
    })
    .then(function(authData){
      // $rootScope.uid = authData.uid;
      console.log("Authenticated successfully with password:", authData.uid);
    })
    .catch(function(error){
      console.log("Auth failed:", error);
      toastr.error(error.code, 'Error');
    });
  };

  $scope.saveUserToDB = function(authData) {
    console.log("auth inside saveuser", authData);
    var ref = new Firebase("https://phr.firebaseio.com");
        console.log("saveUser is ran");
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData),
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
    };
  };

  $scope.logout = function() {
    console.log("user loggedout");
    $ionicHistory.clearCache();
    Auth.$unauth();
  };
})

.controller('signupCtrl', function($scope, $state, Auth, toastr, $rootScope) {
  Auth.$onAuth(function(authData) {
    if(authData === null){
      console.log("no data"); 
    } else {
      $state.go('app.edithand');
      $scope.authData = authData;
      console.log($scope.authData);
    }
  });
  $scope.signup = function(name, email, password){  
  $rootScope.name = name;
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
    $scope.saveUserToDB(authData);
      console.log("Logged in as: ", authData);
    })
    .catch(function(error){
      // console.log("Error: ", error);
      toastr.error(error.code, 'Error');
    });
  };
  
  $scope.saveUserToDB = function(authData) {
    console.log("auth inside saveuser", authData);
    console.log($scope.name);
    var ref = new Firebase("https://phr.firebaseio.com");
    Auth.$onAuth(function(authData) {
      if (authData) {
        console.log("saveUser is ran", authData);
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          emailName: getName(authData),
          name:$rootScope.name

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
    };
  };
})  

.factory("Auth", function($firebaseAuth) {
  var ref = new Firebase("https://phr.firebaseio.com/");
  return $firebaseAuth(ref);
});




