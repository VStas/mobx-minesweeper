import { observer } from 'mobx-react-lite';
import React from 'react';

import { GameStore, GameStatus } from "../store/GameStore";

type Props = {
    gameStore: GameStore;
}

export const GameStatusMessage: React.FC<Props> = observer(({gameStore}) => {
    const {gameStatus} = gameStore;

    if (gameStatus === GameStatus.IN_PROGRESS) {
        return null;
    }

    return (
        <strong>
            {
                gameStatus === GameStatus.LOST ? 'You lost :(' : 'You won :)'
            }
        </strong>
    );
});