function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

function shuffle() {
    let emptyTile = "tile9";
    let directions = [
        { row: 0, col: 1 }, // Right
        { row: 0, col: -1 }, // Left
        { row: 1, col: 0 }, // Down
        { row: -1, col: 0 } // Up
    ];

    let emptyRow = 3;
    let emptyCol = 3;

    for (let i = 0; i < 100; i++) {
        let dir = directions[Math.floor(Math.random() * directions.length)];
        let newRow = emptyRow + dir.row;
        let newCol = emptyCol + dir.col;

        if (newRow >= 1 && newRow <= 3 && newCol >= 1 && newCol <= 3) {
            let emptyCellId = "cell" + emptyRow + emptyCol;
            let newCellId = "cell" + newRow + newCol;

            swapTiles(emptyCellId, newCellId);

            emptyRow = newRow;
            emptyCol = newCol;
        }
    }
    // Reset message on shuffle
    document.getElementById("message").innerText = "";
}

function clickTile(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    var emptyTile = "tile9";

    if (tile !== emptyTile) {
        // Check adjacent tiles (right, left, above, below)
        var adjacentTiles = [
            { row: row, column: column + 1 }, // Right
            { row: row, column: column - 1 }, // Left
            { row: row - 1, column: column }, // Up
            { row: row + 1, column: column }  // Down
        ];

        for (var i = 0; i < adjacentTiles.length; i++) {
            var adj = adjacentTiles[i];
            if (adj.row >= 1 && adj.row <= 3 && adj.column >= 1 && adj.column <= 3) {
                var adjacentTileId = "cell" + adj.row + adj.column;
                // If the adjacent tile is the empty tile, swap
                if (document.getElementById(adjacentTileId).className === emptyTile) {
                    swapTiles("cell" + row + column, adjacentTileId);
                    checkCompletion(); // Check if the puzzle is solved after the move
                    return;
                }
            }
        }
    }
}

function checkCompletion() {
    // Array with the correct tile order
    const correctOrder = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9"];
    
    // Check if all tiles are in the correct order
    let currentOrder = [];
    for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 3; col++) {
            let cell = document.getElementById("cell" + row + col);
            currentOrder.push(cell.className);
        }
    }

    // If the current order matches the correct order, display the message
    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        document.getElementById("message").innerText = "Well done!";
    }
}
