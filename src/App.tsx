import { useState } from 'react';
import './App.scss';
import { Test } from './components/test/Test';

export const App = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(3);

  const increment = () => {
    setCount(prev => prev + value);
  };

  const decrement = () => {
    setCount(prev => prev - value);
  };

  const num = 799;

  return (
    <div className="App">
      <Test />
      <h1>Product Catalog</h1>
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

      <article>
        <h2 style={{ fontSize: '14px', lineHeight: '21px', fontWeight: '400' }}>
          Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
        </h2>
        <p style={{ fontSize: '12px' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique hic
          inventore explicabo corrupti esse doloribus quaerat unde reprehenderit
          nesciunt laboriosam?
        </p>
        <span
          style={{
            fontWeight: '700',
            fontSize: '22px',
            lineHeight: '30.8px',
          }}
        >
          &#36;{num}
        </span>
      </article>
    </div>
  );
};
