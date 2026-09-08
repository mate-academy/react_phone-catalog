import { AppRouter } from './router';

import { Test } from './components/test/Test';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <AppRouter />

      <Test />
    </div>
  );
};
