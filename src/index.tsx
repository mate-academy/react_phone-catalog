import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import './styles/main.scss';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route />
        </Route>
      </Routes>
    </Router>,
  );
