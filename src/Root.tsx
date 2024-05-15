import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import store from './app/store';

export const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<p>NoPages</p>} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
