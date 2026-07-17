import '../styles/global.scss';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './modules/shared/context';
import { Root } from './Root';

export const App = () => (
  <HashRouter>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </HashRouter>
);
