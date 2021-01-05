import { makeAutoObservable } from "mobx";
import { BOMB_VALUE, MinesweeperGame } from "./MinesweeperGame";

export enum CellStatus {
    DEFAULT, OPEN, MARKED_BOMB 
};

export enum GameStatus {
    IN_PROGRESS, WON, LOST
}

export type Cell = {
    status: CellStatus;
    value: number;
};

export class GameStore {
    cells: Cell[][];
    gameStatus: GameStatus;
    cellsOpen = 0;

    constructor(
        public minesweeperGame: MinesweeperGame
    ) {

        const {rows, columns, fieldValues} = minesweeperGame;
        this.cells = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (!this.cells[i]) {
                    this.cells[i] = [];
                }
                this.cells[i][j] = {
                    status: CellStatus.DEFAULT,
                    value: fieldValues[i][j]
                };
            }
        }

        this.gameStatus = GameStatus.IN_PROGRESS;

        makeAutoObservable(this, {
            cellsOpen: false
        });
    }

    openCell = (row: number, column: number) => {
        if (this.gameStatus !== GameStatus.IN_PROGRESS) {
            return;
        }

        if (row < 0 || row >= this.minesweeperGame.rows || column < 0 || column >= this.minesweeperGame.columns) {
            return;
        }

        if (this.cells[row][column].status !== CellStatus.DEFAULT) {
            return;
        }

        this.cells[row][column].status = CellStatus.OPEN;
        this.cellsOpen++;

        if (this.cells[row][column].value === BOMB_VALUE) {
            this.gameStatus = GameStatus.LOST;
            return;
        }

        if (this.minesweeperGame.fieldValues[row][column] === 0) {
            this.openCell(row - 1, column - 1);
            this.openCell(row - 1, column);
            this.openCell(row - 1, column + 1);
            this.openCell(row, column - 1);
            this.openCell(row, column + 1);
            this.openCell(row + 1, column - 1);
            this.openCell(row + 1, column);
            this.openCell(row + 1, column + 1);
        }

        if (this.isVictory()) {
            this.gameStatus = GameStatus.WON;
        }
    }

    toggleMarkBomb = (row: number, column: number) => {
        if (this.gameStatus !== GameStatus.IN_PROGRESS) {
            return;
        }
        const cell = this.cells[row][column];

        if (cell.status === CellStatus.DEFAULT) {
            cell.status = CellStatus.MARKED_BOMB;
        } else if (cell.status === CellStatus.MARKED_BOMB) {
            cell.status = CellStatus.DEFAULT;
        }
    }

    isVictory() {
        const {rows, columns, totalBombs} = this.minesweeperGame;

        return this.cellsOpen === (rows * columns - totalBombs);
    }
}

// class Cell {
//     constructor(public status: CellStatus) {
//         makeAutoObservable(this);
//     }
// }