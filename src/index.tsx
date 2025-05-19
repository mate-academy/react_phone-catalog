import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

root.render(<Root />);
