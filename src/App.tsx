import React from 'react';

import { GameStore } from './store/GameStore';
import { GameField } from './components/GameField';
import { GameStatusMessage } from './components/GameStatusMessage';

const gameStore = new GameStore();

function App() {
  return (
    <>
      <GameField gameStore={gameStore} />
      <GameStatusMessage gameStore={gameStore} />
    </>
  );
}

export default App;
