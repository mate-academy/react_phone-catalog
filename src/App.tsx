import './App.scss';

import { Header } from './pages/components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { Footer } from './pages/components/Footer';
// import { ProductDetailsPage } from './pages/ProductDetailsPage';

const App = () => (
  <div className="App">
    <Header />
    <HomePage />
    <PhonesPage />
    {/* <ProductDetailsPage /> */}
    <Footer />
  </div>
);

export default App;
