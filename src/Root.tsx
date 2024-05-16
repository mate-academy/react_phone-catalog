import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Products } from './pages/Products';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="phones">
          <Route index element={<Products />} />
          <Route path=":productId" element={<Products />} />
        </Route>
        <Route path="tablets">
          <Route index element={<Products />} />
          <Route path=":productId" element={<Products />} />
        </Route>
        <Route path="accessories">
          <Route index element={<Products />} />
          <Route path=":productId" element={<Products />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
