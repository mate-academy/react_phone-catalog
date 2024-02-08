import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';

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
