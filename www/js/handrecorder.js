var PHR = PHR || {};



PHR.Cell = function(val) {
  this.value = typeof val !== 'undefined' ? val : ''; 
  this.isDisabled = false;
};

PHR.HandCell = function(val1, val2) {
  this.card1 = typeof val1 !== 'undefined' ? val1 : '';
  this.card2 = typeof val2 !== 'undefined' ? val2 : '';
  this.isDisabled = false;
};

PHR.PositionCell = function() {
  this.heroPosition = false;
  this.playerNote = '';
}

PHR.Board = function() {
  this.cell = 5;
  this.board = [];
  for (var m = 0; m < this.cell; m++) {
    this.board[m] = new PHR.Cell();
  }
};


PHR.Table = function(rows, col) {
  this.COLUMNS = 9;
  this.ROWS = 6;
  this.rows = this.ROWS;
  this.col = this.COLUMNS;
  this.posVal = ["SB", "BB", "U1", "U2", "M1", "M2", "M3", "CO", "B"];
  this.highlightClasses = ["preflop", "flop", "turn", "river"];
  // for (var f = 0; f < this.col; f++) {
  //   for(var m = 0: m < this.posVal.length)
  //   this.position[f] = ;
  // }

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
  };

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
    console.log(pot);
  return pot;
  };

// arr!!!!
var getVal = function(a){
  var res = _.map(a, function(item){
      return _.pluck(item, "value");
  }); 
  return res;
};
var colSortArray =  _.zip.apply(null, getVal());
console.log(colSortArray);

this.sum = function(matrix) {
  var sums = _.map(matrix, function(item) {
    return _.reduce(item, function(a,b){
        if (a === '' ) a=0;
        if (b === '') b=0;
        return parseInt(a)+parseInt(b);})
  });
  return _.every(sums, function(v, i, a){return i === 0 || v === a[i - 1];});
  };

  // this.disableCell = function(col) {
  //   // console.log("the col is", col);
  //   for (var i=0; i<this.rows; i++) {
  //     // console.log(i, col);
  //     this.hand[i].isDisabled = true;
  //     console.log("this.hand"+ [i]+".isDisabled", this.hand[i].isDisabled);
  //   }
  //   // console.log("disabling cell", this.isDisabled, col);
  // };
};

PHR.Table.prototype.forEachActionCell = function(func) {
  for (var i=0; i<this.rows; i++) {
    for (var j =0; j<this.col; j++) {
      func(this.action[i][j]);
    }
  }
};

PHR.Comment = function(val) {
  this.value = '';
};

