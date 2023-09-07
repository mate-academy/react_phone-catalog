/* eslint-disable no-console */
import { useState } from 'react';
import './App.scss';
import { Dropdown } from './components/Dropdown';

const App = () => {
  const options = ['Newest', 'Oldest', 'Cheapest'];

  const [selected, setSelected] = useState(options[1]);

  const handleClick = (input: string) => {
    setSelected(input);
  };

  return (
    <div className="App">
      <Dropdown
        options={options}
        selected={selected}
        title="sort by"
        onClick={handleClick}
      />
    </div>
  );
};

export default App;
