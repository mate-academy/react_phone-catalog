import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage/HomePage';
import { GlobalProvider } from './store/GlobalContext';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Router>
    <Provider store={store}>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="phones/*" element={<PhonesPage />} />
            <Route path="tablets/*" element={<TabletsPage />} />
            <Route path="accessories/*" element={<AccessoriesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </GlobalProvider>
    </Provider>
  </Router>
);
