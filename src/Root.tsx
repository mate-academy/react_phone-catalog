import { Provider } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { store } from './app/store';
import { Menu } from './components/Menu';
import { PhonesPage } from './pages/PhonesPage';

export const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<Menu />} />
            <Route path="phones" element={<PhonesPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};
