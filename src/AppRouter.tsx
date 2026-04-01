import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<h1>Home Page</h1>} />
      </Route>
    </Routes>
  );
};
