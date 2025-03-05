import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { BurgerProvider } from './context/BurgerContext';

export const Root = () => (
  <BurgerProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </BurgerProvider>
);
