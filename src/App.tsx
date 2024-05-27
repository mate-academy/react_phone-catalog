import './App.scss';
import { Header } from './components/header';
import { Main } from './components/main';

export const App = () => (
  <div className="App">
    <Header />
    <h1 className="app__title">Product Catalog</h1>
    <Main />
  </div>
);
