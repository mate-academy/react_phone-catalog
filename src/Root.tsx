import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { SidebarProvider } from './store/SidebarContext';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { ProductPage } from './modules/ProductPage';
import { WindowWidthProvider } from './store/WindowWidthContext';
import { Reload } from './modules/shared/Reload';

export const Root = () => (
  <Router>
    <WindowWidthProvider>
      <SidebarProvider>
        {/* <ProductProvider> */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            {/* <Route path=":itemId" element={<ProductPage category="phones" />} /> */}

            <Route path="phones">
              <Route index element={<CategoryPage title="Mobile phones" />} />
              <Route path=":itemId" element={<ProductPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<CategoryPage title="Tablets" />} />
              <Route path=":itemId" element={<ProductPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<CategoryPage title="Accessories" />} />
              <Route path=":itemId" element={<ProductPage />} />
            </Route>

            <Route
              path="*"
              element={<Reload imgOfError="page-not-found.png" />}
            />
          </Route>
        </Routes>
        {/* </ProductProvider> */}
      </SidebarProvider>
    </WindowWidthProvider>
  </Router>
);
