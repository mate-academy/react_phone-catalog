import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { Home } from './pages/Home/Home';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/phones" element={<Home />} />
        <Route path="/tablets" element={<Home />} />
      </Route>
    </Routes>
  </Router>
);
