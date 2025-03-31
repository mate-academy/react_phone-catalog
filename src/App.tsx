import './App.scss';
import { Aside } from './components/Aside/Aside';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

export const App = () => {
  return (
    <div>
      <h1 className="visually-hidden">Product Catalog</h1>
      <Header />
      <Aside />
      <Main />
      <Footer />
    </div>
  );
};
