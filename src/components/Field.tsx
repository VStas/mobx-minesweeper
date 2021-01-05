import React from 'react';
import cn from 'classnames';
import { GameStore, Cell, CellStatus } from '../store/GameStore';
import {observer} from 'mobx-react-lite';
import './Field.css';
import { BOMB_VALUE } from '../store/MinesweeperGame';

type CellProps = {
    cell: Cell;
    onOpen(): void;
    onToggleMarkBomb(): void;
};

function getCellDisplayValue(status: CellStatus, value: number) {
    if (status === CellStatus.DEFAULT) {
        return null;
    }
    if (status === CellStatus.OPEN) {
        return (value === BOMB_VALUE || value === 0) ? null : value;
    }
    
    return '|>';
}

const FieldCell: React.FC<CellProps> = observer((props) => {
    const {cell: {status, value}} = props;

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        props.onToggleMarkBomb();
    };

    return (
        <div
            className={cn(
                'cell',
                {'cell_open': status === CellStatus.OPEN},
                {'cell_danger': status === CellStatus.OPEN && value === BOMB_VALUE}
            )}
            onClick={props.onOpen}
            onContextMenu={handleContextMenu}
        >
            {getCellDisplayValue(status, value)}
        </div>
    );
});

type FieldProps = {
    fieldStore: GameStore;
};

export const Field: React.FC<FieldProps> = (props) => {
    const {fieldStore: {cells, openCell, toggleMarkBomb}} = props;

    return (
        <div className="field">
            {cells.map((row, i) => (
                <div className="row" key={i}>
                    {row.map((cell, j) => (
                        <FieldCell
                            key={j}
                            cell={cell}
                            onOpen={() => openCell(i, j)}
                            onToggleMarkBomb={() => toggleMarkBomb(i, j)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

