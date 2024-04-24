import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { SidebarProvider } from './store/SidebarContext';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
// import { ProductProvider } from './store/ProductContext';

export const Root = () => (
  <Router>
    <SidebarProvider>
      {/* <ProductProvider> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
        </Route>
      </Routes>
      {/* </ProductProvider> */}
    </SidebarProvider>
  </Router>
);
