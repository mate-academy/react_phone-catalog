import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProductProvider } from './context/ProductProvider';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/homePage';
import { PhonesPage } from './components/pages/phonesPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
        </Route>
      </Routes>
    </ProductProvider>
  </Router>,
);
