import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const Root = () => (
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

root.render(<Root />);
