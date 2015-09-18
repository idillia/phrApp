angular.module('profile', []) 
 .controller('profileCtrl', ['$scope', '$rootScope', 'Auth',  function($scope, $rootScope, Auth ){
  $scope.auth = Auth;
      // any time auth status updates, add the user data to scope
  $scope.auth.$onAuth(function(authData) {
    $rootScope.authData = authData;
    console.log("auth inside", $rootScope.authData);
  });
  console.log("auth inside", $rootScope.authData);     
  if ($rootScope.authData.facebook === undefined) {
    $scope.photo = $rootScope.authData.password.profileImageURL
  }  else {
    $scope.photo = $rootScope.authData.facebook.profileImageURL
  }                                                                                                                                                                                                                                                                          
}]);
