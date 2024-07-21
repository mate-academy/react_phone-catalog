import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import AppRouter from './providers/router/ui/AppRouter';
import { RoutePaths } from '../shared/config/routeConfig';
import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Suspense fallback="">
        <nav>
          <Link to={RoutePaths.home}>HOME</Link>
          <Link to={RoutePaths.product}>CATALOG</Link>
          <button type="button" className="button" onClick={toggleTheme}>
            Змінити тему
          </button>
        </nav>
        <AppRouter />
        <h1>Product Catalog</h1>
      </Suspense>
    </div>
  );
}

export default App;
