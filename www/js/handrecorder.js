var PHR = PHR || {};


PHR.Cell = function(val) {
  this.value = typeof val !== 'undefined' ? val : ''; 
};

PHR.HandCell = function(val1, val2) {
  this.card1 = typeof val1 !== 'undefined' ? val1 : '';
  this.card2 = typeof val2 !== 'undefined' ? val2 : '';
};

PHR.Table = function(rows, col) {
  this.date = new Date();
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
};
var some = new PHR.Table();
// console.log(some.action)


