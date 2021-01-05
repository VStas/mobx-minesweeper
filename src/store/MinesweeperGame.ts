export const BOMB_VALUE = -1;

export class MinesweeperGame {
    fieldValues: number[][];

    constructor(
        readonly columns: number,
        readonly rows: number,
        readonly totalBombs: number
    ) {
        this.fieldValues = [];
        for (let i = 0; i < rows; i++) {
            this.fieldValues.push([]);
        }
        this.placeBombs();
        this.placeNumbers();
    }

    private getBombsNearby(row: number, column: number) {
        let count = 0;

        const coords = [
            [row - 1, column - 1],
            [row - 1, column],
            [row - 1, column + 1],
            [row, column - 1],
            [row, column + 1],
            [row + 1, column - 1],
            [row + 1, column],
            [row + 1, column + 1]
        ] as const;

        for (const coord of coords) {
            const row = this.fieldValues[coord[0]] || [];
            const value = row[coord[1]];
            if (value === BOMB_VALUE) {
                count++;
            }
        }

        return count;
    }

    private placeBombs() {
        let bombsPlaced = 0;
        while (bombsPlaced < this.totalBombs) {
            const row = Math.floor(Math.random() * this.rows);
            const column = Math.floor(Math.random() * this.columns);
            if (this.fieldValues[row][column] !== BOMB_VALUE) {
                this.fieldValues[row][column] = BOMB_VALUE;
                bombsPlaced++;
            }
        }
    }

    private placeNumbers() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.fieldValues[i][j] !== BOMB_VALUE) {
                    this.fieldValues[i][j] = this.getBombsNearby(i, j);
                }
            }
        } 
    }
}
