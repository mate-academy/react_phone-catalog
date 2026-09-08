import { Outlet } from 'react-router-dom';

export const RouteLayout = () => {
  return (
    <>
      <header>
        <h4>Header</h4>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h4>Footer</h4>
      </footer>
    </>
  );
};
