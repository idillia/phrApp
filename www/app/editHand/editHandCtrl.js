angular.module('editHand', []) 
// Reload editHand after saving, fix back button after profile 
.controller('editHandCtrl', ['$scope','$ionicModal', 'Auth', '$rootScope', '$state', 'toastr',  function($scope, $ionicModal, Auth, $rootScope, $state, toastr){
  // var handId = PHR.generateUUID();
  $scope.table = new PHR.Table();
  $scope.board = new PHR.Board();
  $scope.comment = new PHR.Comment();
  $scope.position = new PHR.PositionCell();
  
  $scope.cardRanks = ["A", "K", "Q", "J", "10", "9","8", "7", "6", "5", "4", "3", "2"];
  $scope.cardSuits = ['\u2660','\u2665', '\u2663', '\u2666'];
  $scope.moneyNumbers = [[1,2,3],[4,5,6],[7,8,9]];
   
  $scope.auth = Auth;
  // any time auth status updates, add the user data to scope
  $scope.auth.$onAuth(function(authData) {
    $rootScope.authData = authData;
  });


 //Board Modal - boardKeypad
  $ionicModal.fromTemplateUrl('app/keypads/boardKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.boardModal = modal;
  });
  $scope.openBoardModal = function(col) {
    $scope.openBoardCol = col;
    $scope.boardModal.show();
    $scope.setSelected = function (col) {
      $scope.idBoardCol = col;
    };
    $scope.setSelected($scope.openBoardCol);
  };  
  $scope.moveBoardPrev = function() {
    if($scope.openBoardCol !== 0) {
      $scope.openBoardCol--;
    }
    $scope.setSelected($scope.openBoardCol); 
  };
  $scope.moveBoardNext = function() {
    if ($scope.openBoardCol < 4 ) {
      $scope.openBoardCol++;
      $scope.setSelected($scope.openBoardCol);
    } else $scope.closeBoardModal();
  };
  
  $scope.closeBoardModal = function() {
    $scope.setSelected($scope.openBoardCol+11);
    $scope.boardModal.hide();
  };
  $scope.buttonBoardModal = function(rank, suit) {
    if ($scope.openBoardCol <= 4){ 
      $scope.modalVal = rank+suit;
      $scope.board.board[$scope.openBoardCol].value = $scope.modalVal;
      delete $scope.modalVal;
      $scope.moveBoardNext();
    } else $scope.closeBoardModal();
  };

  // Position Modal - Player position Keypad
  $ionicModal.fromTemplateUrl('app/keypads/positionKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.posModal = modal;
  });

  $scope.openPositionModal = function(col) {
    $scope.openPosCol = col;
    $scope.posModal.show();
    $scope.setSelected = function (col) {
      $scope.idPositionCol = col;
    };
    $scope.setSelected($scope.openPosCol);
  };

  var called = false;
  $scope.dis = false;
  $scope.toggleIsDisabledCell = function () {
    if (called) { 
      called = false; 
      $scope.dis = false;
      return $scope.table.enableIsDisabled($scope.openPosCol);
    }
    $scope.table.toggleIsDisabled($scope.openPosCol); 
    called = true;
    $scope.dis = true;
  };

  var calledPos = false;
  $scope.pos = false;
  $scope.toggleHeroPosition = function(){
    if (calledPos) {
      calledPos = false;
      $scope.pos = false;
      $scope.position.heroPosition = false;
      console.log($scope.position)
      return $scope.position.heroPosition;
    }
    $scope.position.heroPosition = $scope.openPosCol;
    console.log($scope.position)
    calledPos = true;
    $scope.pos = true;
  };
 
  $scope.movePositionPrev = function() {
    if ($scope.openPosCol !== 0) {
      $scope.openPosCol--;
    }
    $scope.setSelected($scope.openPosCol); 
  };
  $scope.movePositionNext = function() {
    if ($scope.openPosCol < 8) {
      $scope.openPosCol++;
      $scope.setSelected($scope.openPosCol);
    } else $scope.closePositionModal();
  };
  
  $scope.closePositionModal = function() {
    $scope.posModal.hide();
    $scope.setSelected($scope.openPosCol+11);
  };

  // Player Hand Keypad
  $ionicModal.fromTemplateUrl('app/keypads/cardsKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.deckModal = modal;
  });

  $scope.openDeckModal = function(col) {
    $scope.openDeckCol = col;
    $scope.deckModal.show();
    $scope.setSelected = function (col) {
      $scope.idDeckCol = col;
    };
    $scope.setSelected($scope.openDeckCol);
  };
    
  $scope.moveDeckPrev = function() {
    if ($scope.openDeckCol !== 0) {
      $scope.openDeckCol--;
    }
    $scope.setSelected($scope.openDeckCol);
  };
  $scope.moveDeckNext = function() {
    if ($scope.openDeckCol < 8) {
      $scope.openDeckCol++;
      $scope.setSelected($scope.openDeckCol);
    } else $scope.closeDeckModal();
  };
  
  $scope.closeDeckModal = function() {
    $scope.modalVal = [];
    $scope.deckModal.hide();
    $scope.setSelected($scope.openDeckCol+11);
  };

  $scope.buttonDeckModal = function(rank, suit) {
    $scope.modalVal = rank+suit;
    if ($scope.openDeckCol <= 8){ 
      if (typeof $scope.modalCard1 === 'undefined') {
        $scope.modalCard1 = rank+suit; 
        $scope.table.hand[$scope.openDeckCol].card1 = $scope.modalCard1;
        console.log($scope.table.hand[$scope.openDeckCol]);
      }
      else {
        $scope.modalCard1 = rank+suit;
        $scope.table.hand[$scope.openDeckCol].card1 += $scope.modalCard1;
         console.log($scope.table.hand[$scope.openDeckCol]);
        delete $scope.modalCard1;
        $scope.moveDeckNext();  
      }
    } else {
      $scope.closeDeckModal();
    } 
  };
  $scope.unknownCards = function() {
    $scope.table.hand[$scope.openDeckCol].card1 = "XX"; 
    $scope.moveDeckNext();
  }

    // Stack Keypad
  $ionicModal.fromTemplateUrl('app/keypads/stackKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.stackModal = modal;
  });
  $scope.openStackModal = function(col) {
    $scope.openStackCol = col;
    $scope.stackModal.show();
    $scope.modalVal = [];
    $scope.setSelected = function (col) {
      $scope.idStackCol = col;
    };
    $scope.setSelected($scope.openStackCol);
  };  
  $scope.moveStackPrev = function() {
    if ($scope.openStackCol !== 0) {
      $scope.openStackCol--;
      $scope.setSelected($scope.openStackCol);
    }
  };
  $scope.eraseStack = function(){
    $scope.modalVal = [];
    $scope.numbers = '';
    $scope.table.stack[$scope.openStackCol].value ='';
  }
  $scope.moveStackNext = function() {
    $scope.modalVal = [];
    $scope.numbers = '';
    if ($scope.openStackCol < 8) {
      $scope.openStackCol++;
      $scope.setSelected($scope.openStackCol);
    } else $scope.closeStackModal();
  };
  $scope.closeStackModal = function() {
    $scope.modalVal = [];
    $scope.stackModal.hide();
    $scope.setSelected($scope.openStackCol+20);
  };
  $scope.buttonStackModal = function(val) {
    if ($scope.openStackCol <= 8){ 
      $scope.modalVal.push(val);
      console.log($scope.modalVal)
      $scope.numbers = $scope.modalVal.join('');
      $scope.table.stack[$scope.openStackCol].value = $scope.numbers;
      console.log($scope.openStackCol);
    } else {
      $scope.closeStackModal();
    }  
  };

 // Action Keypad
  $ionicModal.fromTemplateUrl('app/keypads/actionKeypad.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.actionModal = modal;
    $scope.modalVal = [];
  });
  $scope.openActionModal = function(row, col) {
    $scope.openActionRow = row;
    $scope.openActionCol = col;
    $scope.actionModal.show();
    $scope.setSelected = function (row, col) {
      $scope.idActionRow = row;
      $scope.idActionCol = col;
    };
    $scope.setSelected($scope.openActionRow,$scope.openActionCol);  
  };  
  $scope.moveActionPrev = function() {
    if ($scope.openActionCol !==0 && $scope.openActionRow === 0)  {
      $scope.openActionCol--;
      $scope.setSelected($scope.openActionRow, $scope.openActionCol);
    } 
    if ($scope.openActionCol ===0 && $scope.openActionRow !== 0)  {
      $scope.openActionRow--;
      $scope.openActionCol = 9;
      $scope.setSelected($scope.openActionRow, $scope.openActionCol);
    }
    if ($scope.openActionCol !==0 && $scope.openActionRow !== 0)  {
      $scope.openActionCol--;
      $scope.setSelected($scope.openActionRow, $scope.openActionCol);
    }
  };
  $scope.moveActionNext = function() {
    $scope.modalVal = [];
    $scope.numbers = '';
    console.log($scope.openActionCol, $scope.table.action[$scope.openActionRow][$scope.openActionCol].isDisabled);
    
    if ($scope.openActionCol < 8) {
      if (!$scope.table.action[$scope.openActionRow][$scope.openActionCol+1].isDisabled) {
        $scope.openActionCol++;

        $scope.setSelected($scope.openActionRow, $scope.openActionCol);
        // $scope.table.action[$scope.openActionRow][$scope.openActionCol].value = $scope.numbers; 
      } else {
        $scope.openActionCol = $scope.openActionCol+2;
         console.log("should skip this", $scope.openActionCol);
        $scope.setSelected($scope.openActionRow, $scope.openActionCol);
        // $scope.table.action[$scope.openActionRow][$scope.openActionCol].value = $scope.numbers;  
      } 

      // console.log($scope.table.action[$scope.openRow][$scope.openCol].value)
    } else if($scope.openActionCol === 8) {
      console.log($scope.openActionRow, $scope.openActionCol)
      $scope.openActionRow++;
      $scope.openActionCol = 0;
      $scope.setSelected($scope.openActionRow, $scope.openActionCol);
      console.log($scope.openActionRow);
    }
    if($scope.openActionCol ===8) {
      $scope.table.addRow();
    }
  };

  $scope.moveOnSum = function () {
    $scope.openActionRow++;
    $scope.openActionCol = 0;
    $scope.setSelected($scope.openActionRow, $scope.openActionCol);
      $scope.modalVal = [];
    $scope.numbers = '';
  }
  $scope.eraseActionModal = function() {
    $scope.modalVal = [];
    $scope.numbers = '';
    $scope.table.action[$scope.openActionRow][$scope.openActionCol].value ='';
  };
  $scope.closeActionModal = function() {
    $scope.modalVal = [];
    $scope.actionModal.hide();
    $scope.setSelected($scope.openActionRow, $scope.openActionCol+11);
  };
  $scope.buttonActionModal = function(val) {
    $scope.modalVal.push(val);
    $scope.numbers = $scope.modalVal.join('');
    $scope.table.action[$scope.openActionRow][$scope.openActionCol].value = $scope.numbers;
    $scope.pot = $scope.table.calculatePotSize();
    $scope.preflopClass = $scope.table.hlCell(); 

    if ($scope.preflopClass) {
      $scope.table.addRow();
      $scope.moveOnSum();
    }
    console.log("preflopClass", $scope.preflopClass); 
  };

 // Save hand information to firebase
  $scope.saveHands = function() {
    console.log("Auth.uid", $rootScope.authData.uid);
    var fireref = new Firebase("https://phr.firebaseio.com/" +"users/"+ $rootScope.authData.uid +"/"+  'handrecords/');
    var handId = fireref.push();

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
    toastr.success('The hand is saved!');
    $scope.clearHand();
  };

  // Restore information from firebase
  $scope.handRecords = [];
  $scope.restoreHand = function() {  
    var fireref = new Firebase("https://phr.firebaseio.com/" +"users/"+ $rootScope.authData.uid +"/"+  'handrecords/');
    fireref.orderByKey().on("child_added", function(snapshot, prevChildKey){
      console.log("snapshot", snapshot.val())
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
      // console.log(board);
      $scope.handRecords.unshift(board);     
      // $scope.$apply();
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };

  $scope.callBtn = function() {

  };

  $scope.foldBtn = function() {
    $scope.table.toggleIsDisabled($scope.openActionCol);
  };

  $scope.checkBtn = function() {
    $scope.table.action[$scope.openActionRow][$scope.openActionCol].value = 0;

  };

  
  $scope.clearHand = function() {
    $scope.table = new PHR.Table();
    $scope.board = new PHR.Board();
    $scope.comment = new PHR.Comment();

  }  

  $scope.modify = function() {
    console.log("modyfing");
  }


}]);




