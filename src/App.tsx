import './App.scss';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';
import { Products } from './Components/Products/products';
import ProductCard from './Components/ProductCard/Productcard';
import './Components/ProductCard/productcard.scss';
import Hotprices from './Components/HotPrices/hotprices';
import Carousel from './Components/Carousel/carousel';
import Categories from './Components/Categories/categories';
import Newmodels from './Components/NewModels/newmodels';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Routes/routes';

const App = () => (
  <div className="App">
    <RouterProvider router={Router} />
  </div>
);

export default App;
