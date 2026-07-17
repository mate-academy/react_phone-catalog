import { HashRouter } from 'react-router-dom';
import './styles/global.scss';
import { Root } from './Root';

export const App = () => (
  <HashRouter>
    <Root />
  </HashRouter>
);
