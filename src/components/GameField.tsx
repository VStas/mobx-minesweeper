import React from 'react';

import { GameStore } from '../store/GameStore';
import { GameCell } from './GameCell';

import './GameField.css';

type FieldProps = {
    gameStore: GameStore;
};

export const GameField: React.FC<FieldProps> = (props) => {
    const {gameStore: {cells, openCell, toggleMarkBomb}} = props;

    return (
        <div>
            {cells.map((row, i) => (
                <div className="row" key={i}>
                    {row.map((cell, j) => (
                        <GameCell
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

