import '../src/styles/main.scss';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { Header } from './modules/shared/Header';

export const App = () => (
  <div className="App">
    <h1 className="App__title-hidden">Product Catalog</h1>

    <Header />

    <HomePage />
  </div>
);
