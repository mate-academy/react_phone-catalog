export * from './App';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HidenMenu } from './modules/HidenMenu/components';
import { HomePage } from './modules/HomePage/components';
import { store } from './app/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="hidenMenu" element={<HidenMenu />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
