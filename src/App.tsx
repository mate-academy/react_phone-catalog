import '../src/App.scss';
import '../src/modules/shared/styles/base/_base.scss';
import { Header } from './modules/shared/components/Header/Header';

export const App = () => (
  <div className="app">
    <h1 className="visually-hidden">Phone Catalog</h1>
    <Header />
    <div className="main">MAIN</div>
    <div className="footer">FOOTER</div>
  </div>
);
