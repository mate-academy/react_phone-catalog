import { Routes, Route } from 'react-router-dom';
import HomePage from '@/modules/HomePage/components/HomePage';
import PhonePage from '@/modules/PhonePage/PhonePage';
import { Layout } from '@/modules/shared/components/Layout/Layout';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Layout wrapper — Navbar, Footer, etc. stay visible */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/phone" element={<PhonePage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
      </Route>

      {/* 404 fallback */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
