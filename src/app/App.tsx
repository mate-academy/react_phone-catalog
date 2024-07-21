import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import AppRouter from './providers/router/ui/AppRouter';
import './styles/App.scss';
import { RoutePaths } from '../shared/config/routeConfig';

function App() {
  return (
    <div className="App">
      <Suspense fallback="">
        <nav>
          <Link to={RoutePaths.home}>HOME</Link>
          <Link to={RoutePaths.product}>CATALOG</Link>
        </nav>
        <AppRouter />
        <h1>Product Catalog</h1>
      </Suspense>
    </div>
  );
}

export default App;
