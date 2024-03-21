import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
