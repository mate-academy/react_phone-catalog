import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { Phones } from './components/ProductPage/Phones';
import { Tablets } from './components/ProductPage/Tablets';
import { Accessories } from './components/ProductPage/Accessories';
import { DetailProdPage } from './components/DetailProdPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/favorites" element={<DetailProdPage />} />{' '}
          {/* ЗМІНИТИ */}
        </Route>
      </Routes>
    </HashRouter>
  </Provider>,
);
