import React from 'react';
import cn from 'classnames';
import {observer} from 'mobx-react-lite';

import { Cell, CellStatus } from '../store/GameStore';
import { BOMB_VALUE } from '../utils/MinesweeperFieldGenerator';

import './GameCell.css';

type Props = {
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

export const GameCell: React.FC<Props> = observer((props) => {
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