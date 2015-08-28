var PHR = PHR || {};


PHR.Cell = function(val) {
  this.value = typeof val !== 'undefined' ? val : "";
};

PHR.Table = function(rows, col) {
  this.COLUMNS = 9;
  this.ROWS = 6;
  this.rows = this.ROWS;
  this.col =this.COLUMNS;

  this.stack = [this.col];
  for (var i = 0; i<col.length; i++) {
    this.stack[i] = new PHR.Cell();
  }

  this.hand = [this.col];
  for (var j = 0; j<col.length: j++) {
    this.hand[j] = new PHR.Cell();
  }

  this.cells = [];

  // Initializing cell
  for (var k = 0; k < this.row.length; k++) {
    this.cells[i] = [];
      for (var m =0; m < this.col.length; m++) {
        this.cell[k][m] = new PHR.Cell();
      }
  }
  
};
