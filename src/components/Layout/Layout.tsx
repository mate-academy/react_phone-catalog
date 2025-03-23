import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    {/* Footer can be added here */}
  </>
);
