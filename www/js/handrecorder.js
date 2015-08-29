var PHR = PHR || {};


PHR.Cell = function(val) {
  this.value = typeof val !== 'undefined' ? val : "";
};

PHR.Table = function(rows, col) {
  this.COLUMNS = 9;
  this.ROWS = 6;
  this.rows = this.ROWS;
  this.col = this.COLUMNS;

  this.stack = [];
  for (var i = 0; i < this.col; i++) {
    this.stack[i] = new PHR.Cell();
  }

  this.hand = [];
  for (var j = 0; j < this.col; j++) {
    this.hand[j] = new PHR.Cell();
  }

  // Initializing cell
  this.action = [];
  for (var k = 0; k < this.rows; k++) {
    this.action[k] = [];
      for (var m = 0; m < this.col; m++) {
        this.action[k][m] = new PHR.Cell();
      }
  }
};



