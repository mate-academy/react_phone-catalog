import { useState } from 'react';
import './App.scss';

export const App = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);

  const increment = () => {
    setCount(prev => prev + value);
  };

  const decrement = () => {
    setCount(prev => prev - value);
  };

  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <h2>DELEET THAT LATER</h2>
      <h2>{count}</h2>
      <input
        type="number"
        min={1}
        max={100}
        value={value}
        onChange={e => setValue(+e.target.value)}
      />
      <div className="buttons">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  );
};
