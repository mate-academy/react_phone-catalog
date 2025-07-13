import './App.scss';
import { Headers } from './component/Header/Header';
import { HomePage } from './Page/HomePage';

export const App = () => {
  return (
    <>
      <div className="App">
        <Headers />
      </div>

      <div>
        <HomePage />
      </div>
    </>
  );
};
