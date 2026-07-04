import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="home" element={<Navigate to={'/'} replace />} />

          <Route path="*" element />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
