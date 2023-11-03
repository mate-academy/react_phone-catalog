import './assets/styles/index.scss';
import { Routing } from '../pages';
import { Header } from '../widgets/Header';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routing />
    </div>
  );
};
