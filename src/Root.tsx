import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { SidebarProvider } from './store/SidebarContext';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { CategotyPage } from './modules/CategotyPage';
// import { Reload } from './modules/shared/Reload';
// import { ProductProvider } from './store/ProductContext';

export const Root = () => (
  <Router>
    <SidebarProvider>
      {/* <ProductProvider> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route
            path="phones"
            element={<CategotyPage title="Mobile phones" />}
          />

          <Route path="tablets" element={<CategotyPage title="Tablets" />} />

          <Route
            path="accessories"
            element={<CategotyPage title="Accessories" />}
          />
          {/* <Route
            path="*"
            element={<Reload imgOfError="page-not-found.png" />}
          /> */}
        </Route>
      </Routes>
      {/* </ProductProvider> */}
    </SidebarProvider>
  </Router>
);
