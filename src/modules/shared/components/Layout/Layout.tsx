import { Outlet } from 'react-router-dom';
import { Navbar } from '@/modules/shared/components/Navbar';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* <- this renders the current route's element */}
      </main>
    </>
  );
};
