import './App.scss';
import './Components/ProductCard/productcard.scss';
import { RouterProvider } from 'react-router-dom';
import { AppRouter, Router } from './Routes/routes';

const App = () => (
  <div className="App">
    <AppRouter />
  </div>
);

export default App;
