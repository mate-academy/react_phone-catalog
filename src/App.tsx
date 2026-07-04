import { Outlet } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <h1>Product Catalog</h1>
      <Outlet />
    </div>
  );
};
