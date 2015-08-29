angular.module('overlay', []) 

.controller('modalKeypadCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('js/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});
//   console.log('viewHandCtrl');
//     // Load the modal from the given template URL
//     $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
//         $scope.modal = $ionicModal;
//     }, {
//         // Use our scope for the scope of the modal to keep it simple
//         scope: $scope,
//         // The animation we want to use for the modal entrance
//         animation: 'slide-in-up'
//     });
// });
