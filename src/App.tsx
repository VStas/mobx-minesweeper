import React from 'react';
import './App.css';

import { MinesweeperGame } from './store/MinesweeperGame';
import { GameStore } from './store/GameStore';
import { Field } from './components/Field';
import { GameStatusMessage } from './components/GameStatusMessage';

const fieldStore = new GameStore(new MinesweeperGame(10, 5, 5));

console.log(fieldStore);

function App() {
  return (
    <>
      <Field fieldStore={fieldStore} />
      <GameStatusMessage gameStore={fieldStore} />
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React 
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
