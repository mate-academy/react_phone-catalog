import './App.scss';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';

export const App = () => (
  <div className="App">
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </div>
);
