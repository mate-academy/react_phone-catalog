import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { GlobalStateProvider } from './store/GlobalStateProvider';
import { HomePage } from './pages/Home/Home.page';
// import { CatalogPage } from './pages/Catalog/Catalog.page';
import { App } from './App';
import { CatalogPage } from './pages/Catalog/Catalog.page';

export const Root = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:category" element={<CatalogPage />} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
