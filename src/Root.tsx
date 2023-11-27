import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="phones"
            element={<PhonesPage />}
          />
        </Route>
      </Routes>
    </Router>
  </Provider>

);
