import './App.scss';
import './global-styles/normalize.scss';
import { Header } from './widgets/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <h1>Product Catalog</h1>
  </div>
);
