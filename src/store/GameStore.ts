import { action, makeObservable, observable } from "mobx";
import { BOMB_VALUE, MinesweeperFieldGenerator } from "../utils/MinesweeperFieldGenerator";

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

const TOTAL_COLUMNS = 10;
const TOTAL_ROWS = 5;
const TOTAL_BOMBS = 5;

// надо вынести Cell в отдельный класс, но мне было лень

export class GameStore {
    cells: Cell[][];
    gameStatus: GameStatus;
    cellsOpen = 0;

    constructor() {
        const {fieldValues} = new MinesweeperFieldGenerator(TOTAL_COLUMNS, TOTAL_ROWS, TOTAL_BOMBS);

        this.cells = [];
        for (let i = 0; i < TOTAL_ROWS; i++) {
            for (let j = 0; j < TOTAL_COLUMNS; j++) {
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

        makeObservable(this, {
            cells: observable,
            gameStatus: observable,
            openCell: action,
            toggleMarkBomb: action
        });

    }

    openCell = (row: number, column: number) => {
        if (this.gameStatus !== GameStatus.IN_PROGRESS) {
            return;
        }

        if (row < 0 || row >= TOTAL_ROWS || column < 0 || column >= TOTAL_COLUMNS) {
            return;
        }

        const cell = this.cells[row][column];

        if (cell.status !== CellStatus.DEFAULT) {
            return;
        }

        cell.status = CellStatus.OPEN;
        this.cellsOpen++;

        if (cell.value === BOMB_VALUE) {
            this.gameStatus = GameStatus.LOST;
            return;
        }

        if (cell.value === 0) {
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
        return this.cellsOpen === (TOTAL_ROWS * TOTAL_COLUMNS - TOTAL_BOMBS);
    }
}
