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


 // Board - boardKeypad
  $ionicModal.fromTemplateUrl('js/keypads/boardKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.boardModal = modal;
  });
  $scope.openBoardModal = function(col) {
    $scope.openCol = col;
    $scope.boardModal.show();
  };  
  $scope.moveBoardPrev = function() {
    if($scope.openCol !== 0) {
      $scope.openCol--;
      console.log($scope.openCol);
      if ($scope.openCol >= 0) {
        $scope.board.board[$scope.openCol].value = $scope.modalVal;  
      }
  }
  };
  $scope.moveBoardNext = function() {
    if ($scope.openCol < 4 ) {
      $scope.openCol++;
      $scope.board.board[$scope.openCol].value = $scope.modalVal;
    } else return;
  };
  
  $scope.closeBoardModal = function() {
    $scope.boardModal.hide();
  };
  $scope.buttonBoardModal = function(rank, suit) {
    if ($scope.openCol <= 4){ 
      $scope.modalVal = rank+suit;
      $scope.board.board[$scope.openCol].value = $scope.modalVal;
      delete $scope.modalVal;
      $scope.moveBoardNext();
    } else $scope.closeBoardModal();
  };
  // Player position Keypad

  $ionicModal.fromTemplateUrl('js/keypads/positionKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.posModal = modal;
  });

  $scope.openPositionModal = function(col) {
    $scope.openCol = col;
    $scope.posModal.show();
  };

  // $scope.noPlayer = function() {
  //   // $scope.table.disableCell($scope.openCol);
  //   console.log($scope.table);

  //   // $scope.isDisabled = true;
  //   // $scope.dis = 
  //   for (var i = 0; i< $scope.table.hand.length; i++) {
  //     $scope.table.hand[i].isDisabled = true;
  //     $scope.isDisabled = $scope.table.hand[i].isDisabled;
  //   console.log($scope.table.hand[i]);
  //   }
  // };
    
  // $scope.movePositionPrev = function() {
  //   $scope.openCol--;
  //   if ($scope.openCol > 0) {
  //     $scope.table.[$scope.openCol].value = $scope.modalVal;  
  //   }
  // };
  // $scope.movePositionNext = function() {
  //   $scope.openCol++;
  //   if ($scope.openCol <= 8) {
  //     console.log($scope.openCol);
  //     $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
  //   } else return;
  // };
  
  $scope.closePositionModal = function() {
    $scope.posModal.hide();
  };
  $scope.playerNoteModal = function() {
    
  };
  // Player Hand Keypad
  $ionicModal.fromTemplateUrl('js/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.deckModal = modal;
  });

  $scope.openDeckModal = function(col) {
    $scope.openCol = col;
    $scope.deckModal.show();
  };
  // $scope.noPlayer = function() {
  //   // $scope.table.disableCell($scope.openCol);
  //   console.log($scope.table);

  //   // $scope.isDisabled = true;
  //   // $scope.dis = 
  //   for (var i = 0; i< $scope.table.hand.length; i++) {
  //     $scope.table.hand[i].isDisabled = true;
  //     $scope.isDisabled = $scope.table.hand[i].isDisabled;
  //   console.log($scope.table.hand[i]);
  //   }
  // };
    
  $scope.moveDeckPrev = function() {
    $scope.openCol--;
    if ($scope.openCol >= 0) {
      $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
    }
  };
  $scope.moveDeckNext = function() {
    $scope.openCol++;
    if ($scope.openCol <= 8) {
      $scope.table.hand[$scope.openCol].value = $scope.modalVal;  
    } else return;
  };
  
  $scope.closeDeckModal = function() {
    $scope.modalVal = [];
    $scope.deckModal.hide();
  };
  $scope.buttonDeckModal = function(rank, suit) {
    $scope.modalVal = rank+suit;
    if ($scope.openCol <= 8){ 
      if (typeof $scope.modalCard1 === 'undefined') {
        $scope.modalCard1 = rank+suit;  
      }
      else {
        $scope.modalCard2 = rank+suit;
        $scope.table.hand[$scope.openCol] = new PHR.HandCell($scope.modalCard1, $scope.modalCard2);
        delete $scope.modalCard1;
        delete $scope.modalCard2;
        $scope.moveDeckNext();  
      }
    } else {
      $scope.closeDeckModal();
    }  
  };

    // Stack Keypad
  $ionicModal.fromTemplateUrl('js/keypads/stackKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.stackModal = modal;
  });
  $scope.openStackModal = function(col) {
    $scope.openCol = col;
    $scope.stackModal.show();
    $scope.modalVal = [];
  };  
  $scope.moveStackPrev = function() {
    if ($scope.openCol !== 0) {
      $scope.openCol--;
      if ($scope.openCol > 0) {
        $scope.table.stack[$scope.openCol].value = $scope.numbers;  
      }
    }
  };
  $scope.eraseStack = function(){
    $scope.modalVal = [];
    $scope.table.stack[$scope.openCol].value ='';
  }
  $scope.moveStackNext = function() {
    $scope.modalVal = [];
    $scope.openCol++;
    if ($scope.openCol <= 8) {
      $scope.table.stack[$scope.openCol].value = $scope.numbers;  
    } else $scope.closeStackModal();
  };
  $scope.closeStackModal = function() {
    $scope.modalVal = [];
    $scope.stackModal.hide();
  };
  $scope.buttonStackModal = function(val) {
    if ($scope.openCol <= 8){ 
      $scope.modalVal.push(val);
      $scope.numbers = $scope.modalVal.join('');
      $scope.table.stack[$scope.openCol].value = $scope.numbers;
       console.log($scope.table.stack[$scope.openCol].value)

    } else {
      $scope.closeStackModal();
    }  
  };


 // Action Keypad
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
    $scope.hlCell = function() {
      console.log("is being called")
    return $scope.openCol == $scope.opneCol;
  }
    
  };  
  $scope.moveActionPrev = function() {
    $scope.openCol--;
    if ($scope.openCol > 0) {
      $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;  
    }
  };
  $scope.moveActionNext = function() {
    $scope.modalVal = [];
    $scope.numbers = '';
    
    if ($scope.openCol < 8) {
      $scope.openCol++;
      console.log($scope.openCol)
      $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;  
      console.log($scope.table.action[$scope.openRow][$scope.openCol].value)
     
    } else if($scope.openCol === 8) {

      console.log($scope.openRow, $scope.openCol)
        $scope.openRow++;
        $scope.openCol = 0;
        console.log($scope.openRow);
    }
    if($scope.openCol ===7) {
      $scope.table.addRow();
    }
    

  };

  // $scope.eraseActionModal = function() {
  //   $scope.modalVal = [];
  // };
  $scope.closeActionModal = function() {
    $scope.modalVal = [];
    $scope.actionModal.hide();
    
  };
  $scope.buttonActionModal = function(val) {
    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.action[$scope.openRow][$scope.openCol].value = $scope.numbers;
    $scope.colSum= $scope.table.getSum();
    // console.log($scope.colSum());
    $scope.pot = $scope.table.calculatePotSize();
    // console.log($scope.pot);
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
  $scope.handRecords = [];
  $scope.restoreHand = function() {  
    fireref.orderByKey().on("child_added", function(snapshot, prevChildKey){
      var board = {};
      var b = JSON.parse(snapshot.val().board);
      var t = JSON.parse(snapshot.val().table);
      var c = JSON.parse(snapshot.val().comment);
      for (var prop in b) {
        board[prop] = b[prop];
        for (var x in t) {
          board[x] = t[x];
          for (var a in c) {
            board[a] = c[a];
          }
        }
      }
      console.log(board);
      $scope.handRecords.unshift(board);     
      // $scope.$apply();
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };
  
  $scope.clearHand = function() {
    $scope.table = new PHR.Table();
    $scope.board = new PHR.Board();
    $scope.comment = new PHR.Comment();
  }
  



  
     

}]);




