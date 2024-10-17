const app = Vue.createApp({
    data() {
        return {
            cell: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ], //empty cell data
            currentPlayer: 1,  // 1 for X, 2 for O
            gameWon: false, //setting gameWon status to False to initialize
            winningCells: [] //creating a list to store the winning cells
        };
    },
    methods: {
        makeMove(row, col) {
            if (this.cell[row][col] === 0 && !this.gameWon) { //checks if the cell is empty & if the game has yet to be won
                this.cell[row][col] = this.currentPlayer; //sets the value to current player
                if (this.checkWin(this.currentPlayer)) { //checks if a player has won
                    this.gameWon = true; 
                } else { //if nobody has won, then set the player to the counterpart player so the game can progress
                    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                }
            }
        },
        checkWin(player) {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal win
                [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical win
                [0, 4, 8], [2, 4, 6]               // Diagonal win
            ];

            const flatCell = this.cell.flat();
            for (const combo of winningCombinations) {
                if (flatCell[combo[0]] === player && //goes through all combos cross referencing the player to see if there is a win)
                    flatCell[combo[1]] === player &&
                    flatCell[combo[2]] === player) {
                    this.winningCells = combo; // Store winning cell indices
                    return true;
                }
            }
            return false;
        },
        resetGame() {
            this.cell = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            this.currentPlayer = 1;
            this.gameWon = false;
            this.winningCells = []; // Reset winning cells
        }
    }
});

app.mount('#app');
