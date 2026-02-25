import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './modules/Core/AppLayout';
import { HomePage } from './modules/HomePage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<div>Phones Page</div>} />

        <Route path="tablets" element={<div>Tablets Page</div>} />

        <Route path="tablets" element={<div>Accessories Page</div>} />

        <Route path="cart" element={<div>Cart Page</div>} />

        <Route path="favourits" element={<div>Favourits Page</div>} />

        <Route path="*" element={<div>Page not Found</div>} />
      </Route>
    </Routes>
  );
};
