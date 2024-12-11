import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<h1>PHONES</h1>} />
          <Route path="/tablets" element={<h1>TABLETS</h1>} />
          <Route path="/accessories" element={<h1>ACCESSORIES</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>,
);
