class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $square = $("li");
    $square.click( (e) => {
      let $target = $(e.currentTarget);

      if($target.html() === "X" || $target.html() === "O") {
        alert("Invalid move!");
      } else {
        this.game.playMove($target.data('pos'));
        let player = this.game.currentPlayer;
        this.makeMove($target);

        if (this.game.isOver()) {
          if (this.game.winner()) {
            alert(`${player}, ᕦ(ò_óˇ)ᕤ`);
            $("li:contains(" + player +")").css("background-color", "turquoise");
            $("li:contains(" + player +")").css("color", "white");
            $square.off("click");
          } else {
            alert('(▀̿Ĺ̯▀̿ ̿)  FAILURES!');
          }
        }
      }
    });

  }

  makeMove($square) {
    $square.append(`${this.game.currentPlayer}`);
    $square.css("background-color", "white");
  }

  setupBoard() {
    for (var i = 0; i < 3; i++) {
      this.addRow();
    }
  }

  addRow() {
    const rowIdx = this.$el.find(".row").length;
    const $row = $("<ul>").addClass("row").addClass("group");
    for(let colIdx = 0; colIdx < 3; colIdx++) {
      const $square = $("<li>").data("pos", [rowIdx, colIdx]);
      $row.append($square);
    }
    this.$el.append($row);
  }
}

module.exports = View;
