angular.module('starter', ['ionic', 'firebase'])

.directive(editHand, function(){
  return {
    restrict: E,
    templateUrl:'../js/chat/editHand/editHand.hmtl'
  };
})