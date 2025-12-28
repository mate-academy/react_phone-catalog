import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Phones from '@/pages/Phones';

import '@/App.scss';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="phones" element={<Phones />} />
      </Route>
    </Routes>
  </Router>
);
