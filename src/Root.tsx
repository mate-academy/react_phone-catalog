import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Вкладені маршрути (Children) */}
        <Route index element={<h1>Home Page</h1>} />
        <Route path="phones" element={<h1>Phones Page</h1>} />
        <Route path="tablets" element={<h1>Tablets Page</h1>} />
        <Route path="accessories" element={<h1>Accessories Page</h1>} />

        {/* Редірект для застарілих посилань */}
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>

      {/* Сторінка 404 (якщо шлях не знайдено) */}
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </Router>
);
