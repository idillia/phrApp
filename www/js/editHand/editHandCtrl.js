angular.module('editHand', []) 

.controller('editHandCtrl', ['$scope','$ionicModal', function($scope, $ionicModal){
  // var handId = PHR.generateUUID();
  $scope.table = new PHR.Table();
  $scope.board = new PHR.Board();
  $scope.comment = new PHR.Comment();
  var fireref = new Firebase("https://phr.firebaseio.com/" + 'handrecords/');
  var handId = fireref.push();


  $scope.cardRanks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  $scope.cardSuits = ['\u2660','\u2665', '\u2663', '\u2666'];


  // Cards custom keypad when inputing in table.hand

  $ionicModal.fromTemplateUrl('js/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.deckModal = modal;
  });

  $scope.openDeckModal = function(row, col) {
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.deckModal.show();
    
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
      }
    };
    $scope.moveNext = function() {
      $scope.openCol++;
      if ($scope.openCol <= 8) {
        console.log($scope.openCol);
        $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
      } else return;
    };
  };
  $scope.closeDeckModal = function() {
    $scope.table.hand[$scope.openCol].value = $scope.modalVal;
    $scope.deckModal.hide();
  };

  $scope.buttonDeckModal = function(rank, suit) {
    $scope.modalVal = rank+suit;

    if (typeof $scope.modalCard1 === 'undefined') {
        $scope.modalCard1 = rank+suit;  
    }
    else {
        $scope.modalCard2 = rank+suit;
        $scope.table.hand[$scope.openCol] = new PHR.HandCell($scope.modalCard1, $scope.modalCard2);
        // console.log('card1: ' + $scope.table.hand[$scope.openCol].card1 + " , card2: " + $scope.table.hand[$scope.openCol].card2);
        delete $scope.modalCard1;
        delete $scope.modalCard2;
        $scope.moveNext();  
    }
  };
 // Number custom keypad when inputing in table.action
  $ionicModal.fromTemplateUrl('js/keypads/actionKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.actionModal = modal;
    $scope.modalVal = [];
  });
  $scope.openActionModal = function(row, col) {
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.actionModal.show();
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;  
      }
    };
    $scope.moveNext = function() {
      $scope.modalVal = [];
      $scope.openCol++;
      if ($scope.openCol <= 8) {
        $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;  
      } else return;
    };
  };
  $scope.eraseActionModal = function() {
    $scope.modalVal = [];
  };
  $scope.closeActionModal = function() {
    $scope.modalVal = [];
    $scope.actionModal.hide();
    $scope.calculatePotSize();
    console.log($scope.calculatePotSize());
  };
  $scope.buttonActionModal = function(val) {
    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;
  };

  // Number custom keypad when inputing in table.stack
  $ionicModal.fromTemplateUrl('js/keypads/stackKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.stackModal = modal;
  });
  $scope.openStackModal = function(row, col) {
    $scope.openRow = row;
    $scope.openCol = col;
    $scope.stackModal.show();
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.stack[$scope.openCol].value = $scope.numbers;  
      }
    };
    $scope.moveNext = function() {
      $scope.modalVal = [];
      $scope.openCol++;
      if ($scope.openCol <= 8) {
        $scope.table.stack[$scope.openCol].value = $scope.numbers;  
      } else return;
    };
  };
  $scope.eraseStackModal = function() {
    $scope.modalVal = [];
  };
  $scope.closeStackModal = function() {
    $scope.modalVal = [];
    $scope.stackModal.hide();
  };
  $scope.buttonStackModal = function(val) {
    console.log($scope.modalVal)
    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.stack[$scope.openCol].value = $scope.numbers;
  };

  // Cards custom keypad when inputing in board.board
  $ionicModal.fromTemplateUrl('js/keypads/cardsBoardKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.boardModal = modal;
  });
  $scope.openBoardModal = function(row, col) {
    console.log("open bord model")
    $scope.openCol = col;
    $scope.boardModal.show();
    $scope.movePrev = function() {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.board.board[$scope.openCol].value = $scope.modalVal;  
      }
    };
    $scope.moveNext = function() {
      $scope.openCol++;
      if ($scope.openCol <= 4 ) {
        $scope.board.board[$scope.openCol].value = $scope.modalVal;
 
      } else return;
    };
  };
  $scope.closeBoardModal = function() {
    $scope.boardModal.hide();
  };
  $scope.buttonBoardModal = function(rank, suit) {
  if ($scope.openCol <=4){ 
    $scope.modalVal = rank+suit;
    $scope.board.board[$scope.openCol].value = $scope.modalVal;
    delete $scope.modalVal;
    $scope.moveNext();
  } else $scope.closeBoardModal();
  };

  // Save hand information to firebase
  $scope.saveHands = function() {
    console.log("saving hands...")
    var boardref = handId.child("board");
    boardref.set(JSON.stringify($scope.board), function(error) {
      if (error) {console.log("failed to save")}
      else {console.log("board saved successfuly")}
    });
    var tableref = handId.child("table");
    tableref.set(JSON.stringify($scope.table), function(error) {
      if (error) {console.log("failed to save")}
      else {console.log("table saved successfuly")}
    });
    var commentref = handId.child("comment");
    commentref.set(JSON.stringify($scope.comment), function(error) {
      if (error) {console.log("failed to save")}
      else {console.log("comment saved successfuly")}
    });
  };

  // Restore information from firebase
  $scope.restoreHand = function() {  
    handId.on('value', function(snapshot){
      console.log(snapshot);
      
      // $scope.table = JSON.parse(snapshot.val());
      // $scope.$apply();
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };
  // $scope.restoreHand()
  $scope.calculatePotSize = function() {
    console.log($scope.table.rows, $scope.table.col);
      var pot = 0; 
      for (var i = 0; i < 2; i++){
        for(var k = 0; k < 1; k++)
          if ($scope.table.action[i][k].value == "") {
            console.log("yes");
          }
          pot += $scope.table.action[i][k].value;
        console.log(parseInt($scope.table.action[0][0].value));
      }
      return pot;
    }
  
}]);


// .factory('editHandRecords', function(){
//   return {

//   }
// }); 



