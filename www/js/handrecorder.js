var PHR = PHR || {};

//Generating UUID
PHR.generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };


PHR.Cell = function(val) {
  this.value = typeof val !== 'undefined' ? val : ''; 
};

PHR.HandCell = function(val1, val2) {
  this.card1 = typeof val1 !== 'undefined' ? val1 : '';
  this.card2 = typeof val2 !== 'undefined' ? val2 : '';
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
  this.ROWS = 6;
  this.rows = this.ROWS;
  this.col = this.COLUMNS;

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
    console.log(pot);
  return pot;
  };
};

PHR.Comment = function(val) {
  this.value = '';
};

