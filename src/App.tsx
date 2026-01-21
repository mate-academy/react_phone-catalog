import { Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => {
  // <div className="App">
  //   <h1>Product Catalog</h1>
  // </div>
  <Outlet />;
  // return <HomePage />;
};
