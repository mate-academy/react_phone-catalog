import './App.module.scss';
import React, {useState, useEffect} from 'react';
import { Loader } from './components/Loader/Loader';
import { ProductSlider } from './components/ProductSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UnderConstruction } from './components/UnderConstruction';

export const App: React.FC = () => {
const [loading, setLoading] = useState(true)

useEffect(() => {
  setLoading(false)
},[]);

  return (
    <div className="App">


      {loading ? (
        <Loader />
      ) : (
        <div>
          <UnderConstruction />
          <Header />
          <ProductSlider />
          <Footer />
        </div>
      )
      }
    </div>
  );
};
