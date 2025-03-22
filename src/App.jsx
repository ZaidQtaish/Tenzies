import { useState } from "react";
import Die from "./components/Die.jsx";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  // check if the game is won
  const gameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value);


  function generateAllNewDice() {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      numbers.push({
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return numbers;
  }

  function rollDice() {
      if (!gameWon){
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        ));
      } else 
        setDice(generateAllNewDice())
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">{diceElements}</div>
      <button id="roll" onClick={rollDice}>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
      { gameWon && <Confetti /> }
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
    </main>
  );
}

export default App;
