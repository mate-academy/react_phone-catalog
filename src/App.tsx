import './App.scss';
import './Components/ProductCard/productcard.scss';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Routes/routes';

const App = () => (
  <div className="App">
    <RouterProvider router={Router} />
  </div>
);

export default App;
