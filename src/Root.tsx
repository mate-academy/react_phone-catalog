import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { Home } from './pages/Home/Home';
import { Phones } from './pages/Phones/Phones';
import { PhonesProvider } from './storage/phonesContext';

export const Root: React.FC = () => (
  <PhonesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/phones/:phoneId?">
            <Route index element={<Phones />} />
          </Route>
          <Route path="/tablets" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  </PhonesProvider>
);
