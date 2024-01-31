import { Route, Routes } from 'react-router-dom';
import './App.scss';
import {
  HomePage, Root, NotFoundPage, PhonesPage,
} from './components';

export const App = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="phones" element={<PhonesPage />} />
      {/*
        <Route path="model" element={<PhonePage />} />
      <Route path="*favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
