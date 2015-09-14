angular.module('chat', [])

// .factory('chatMessages', ['$firebaseArray', function($firebaseArray){
//   var ref = new Firebase("https://phr.firebaseio.com/" + 'chat');
//   return $firebaseArray(ref);
//   // return $firebaseArray(ref.limitToLast(10)).$asArray();

// }])
// .controller('chatCtrl', ['$scope', 'chatMessages', function($scope, chatMessages){
//   $scope.messages= chatMessages;
//   $scope.message = {};
//   console.log($scope);
//   $scope.addMessage = function(message) {
//     console.log("submiting message");
//     $scope.messages.$add({content: message});
//     $scope.message.theMessage= "";
//   }
// }]);

 .controller('chatCtrl', ['$scope','Message', '$rootScope', 'Auth',  function($scope,Message, $rootScope, Auth ){

  $scope.auth = Auth;

      // any time auth status updates, add the user data to scope
  $scope.auth.$onAuth(function(authData) {
    $rootScope.authData = authData;
    console.log("auth inside", $rootScope.authData);
  });

  console.log("auth outside", $rootScope.authData);
  
      $scope.user="Guest";
 
      $scope.messages= Message.all;

      $scope.inserisci = function(message){
        Message.create(message);
      };
  }])
 
.factory('Message', ['$firebaseArray', '$rootScope',
  function($firebaseArray, $rootScope) {
    var ref = new Firebase('https://phr.firebaseio.com/' +"users/"+ $rootScope.authData.uid +"/"  );
    var messages = $firebaseArray(ref.child('messages'))

    var Message = {
      all: messages,
      create: function (message) {
        return messages.$add(message);
      },
      get: function (messageId) {
        return $firebase(ref.child('messages').child(messageId)).$asObject();
      },
      delete: function (message) {
        return messages.$remove(message);
      }
    };

    return Message;

  }
  ]);



