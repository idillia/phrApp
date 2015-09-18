var PHR = PHR || {};
PHR.Cell = function(val) {
  this.value = typeof val !== 'undefined' ? val : ''; 
  this.isDisabled = false;
  this.disCol = false;
  this.isHighlighted = '';
};

PHR.HandCell = function(val1) {
  this.card1 = typeof val1 !== 'undefined' ? val1 : '';
  this.isHighlighted = '';
  this.isDisabled = false;
};

PHR.PositionCell = function() {
  this.heroPosition = false;
  this.playerNote = '';
};

PHR.Board = function() {
  this.cell = 5;
  this.board = [];
  for (var m = 0; m < this.cell; m++) {
    this.board[m] = new PHR.Cell();
  }
};

PHR.Table = function(rows, col) {
  this.COLUMNS = 9;
  this.ROWS = 1;
  this.rows = this.ROWS;
  this.col = this.COLUMNS;
  this.posVal = ["SB", "BB", "U1", "U2", "M1", "M2", "M3", "CO", "B"];
  this.moneyNumbers = [1,2,3,4,5,6,7,8,9];
  this.highlightClasses = ["preflop", "flop", "turn", "river"];
  this.highlightIndex = 0;

  this.hand = [];
  for (var j = 0; j < this.col; j++) {
    this.hand[j] = new PHR.HandCell();
  }

  this.stack = [];
  for (var i = 0; i < this.col; i++) {
    this.stack[i] = new PHR.Cell();
  }

  this.action = [];
  for (var k = 0; k < this.rows; k++) {
    this.action[k] = [];
    for (var m = 0; m < this.col; m++) {
      this.action[k][m] = new PHR.Cell();
    }
  }
  this.calculatePotSize = function() {
    var pot = 0; 
    for (var i = 0; i < this.rows; i++){
      for(var k = 0; k < this.col; k++){
        if (this.action[i][k].value !== "") {        
          pot += parseInt(this.action[i][k].value);
        } else {
        }
      }
    }
  return pot;
  };

  this.getSum = function() {
    var colSortArray = [];
    this.getVal = function(a){
      var res = _.map(a, function(item){
        console.log("item",item);
        return _.pluck(_.filter(item, function(isd){
          console.log("before filter isd",isd);
          return !isd.isDisabled;
        }), "value");
      }); 
      console.log("res", res);
      return res;
    };

    colSortArray = _.zip.apply(null, this.getVal(this.action));

    return function() {
      var sums = _.map(colSortArray, function(item) {
        return _.reduce(item, function(a,b){
          if (a === '' ) a=0;
          if (b === '') b=0;
          return parseInt(a)+parseInt(b);
        });
      });
      console.log("sums", sums);
      return _.every(sums, function(v, i, a){return i === 0 || v === a[i - 1];});
    }; 
  };   

   this.setIsHighlighted = function () {
    for (var m =0; m<this.row; m++){
      this.hand[m].isHighlighted = this.highlightClasses[this.highlightIndex];
      this.stack[m].isHighlighted = this.highlightClasses[this.highlightIndex];
      console.log("I'm passing hlIndex of ", this.hand, this.stack)
    }
    for (var i=0; i<this.rows; i++) {
      for (var j =0; j<this.col; j++) {
        // console.log(this.highlightClasses[this.highlightIndex]);
        if ((this.action[i][j].isHighlighted === '' && this.action[i][j].value !== '')|| (this.action[i][j].isHighlighted === '' && this.action[i][j].isDisabled === true && this.action[i][j].value === '')){
          // console.log("I'm passing hlIndex of ", this.highlightIndex)
          this.action[i][j].isHighlighted = this.highlightClasses[this.highlightIndex];
        }  
      }  
    }
    return this.highlightClasses[this.highlightIndex];
  };

  
  this.toggleIsDisabled = function (index) {
    this.hand[index].isDisabled = true;
    this.stack[index].isDisabled = true;
    var disSort = _.zip.apply(null, this.action);
    for (var i =0; i<disSort[index].length; i++) {
      disSort[index][i].isDisabled = true;
      disSort[index][i].disCol = index;
      console.log(disSort[index][i].disCol);
     }
     return false;
  };

  this.enableIsDisabled = function (index) {
    this.hand[index].isDisabled = false;
    this.stack[index].isDisabled = false;

    var disSort = _.zip.apply(null, this.action);
    for (var i =0; i<disSort[index].length; i++) {
      disSort[index][i].isDisabled = false;
      disSort[index][i].disCol = false;
     }
     return true;
  };


  this.hlCell = function() {
    var hlClass ='';
    if (this.getSum()()){
      hlClass = this.setIsHighlighted();
      // console.log(this.action)
      this.highlightIndex++;
      // console.log("this.highlightIndex",this.highlightIndex);
    }
    // console.log(hlClass);
    return hlClass;
  }; 

  this.checkDisCol = function() {
    var col = [];
    var lastRow= this.action[this.action.length-2];
    for (var i=0; i<lastRow.length; i++) {
      col.push(lastRow[i].disCol);
    }
    return col;
  };

   this.checkDisColStatus = function() {
    var col = [];
    var lastRow= this.action[this.action.length-2];
    for (var i=0; i<lastRow.length; i++) {
      col.push(lastRow[i].isDisabled);
    }
    return col;
  };

  this.addRow = function() {
    this.action[this.rows] = [];
    for (var j=0; j<this.col; j++) {
      this.action[this.rows][j] = new PHR.Cell();
      var lastRow = this.checkDisCol();
      var lastRowIsDis = this.checkDisColStatus();
      this.action[this.rows][j].disCol = lastRow[j];
      this.action[this.rows][j].isDisabled = lastRowIsDis[j]; 
      console.log("lastrowI", lastRowIsDis[j]);
      console.log("inside poslednei row llop and j: ",j, this.action[this.rows][j]);
    }
    ++this.rows;
    console.log("updated action", this.action);
  }; 
};

PHR.Comment = function(val) {
  this.value = '';
};

