describe('Controllers', function(){
  var scope;
  // load the controller's module
  beforeEach(module('starter'));
  
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('editHandCtrl', {$scope: scope});
  }));
  
  // tests start here
  it('should have test to be true', function(){
    expect(scope.test).toEqual(true);
  });
});