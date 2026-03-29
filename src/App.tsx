import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout, Home, Phones } from '@/pages';

import '@/App.scss';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="phones" element={<Phones />} />
        <Route path="tablets" element={<></>} />
        <Route path="accessories" element={<></>} />
        <Route path="liked" element={<></>} />
        <Route path="shopping_bag" element={<></>} />
      </Route>
    </Routes>
  </Router>
);
