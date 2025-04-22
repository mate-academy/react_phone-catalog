import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const Root = () => (
  <Router>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  </Router>
);

root.render(<Root />);
