import { App } from './App';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Menu } from './components/Header/components/Menu/Menu';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path=":menu" element={<Menu />} />
      </Route>
    </Routes>
  </Router>
);
