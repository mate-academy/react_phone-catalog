import './App.module.scss';
import React, {useState, useEffect} from 'react';
import { Loader } from './components/Loader/Loader';
import { BannerSlider } from './components/BannerSlider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UnderConstruction } from './components/UnderConstruction';

export const App: React.FC = () => {
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  setIsLoading(false)
},[]);

  return (
    <div className="App">


      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <UnderConstruction />
          <Header />
          <BannerSlider />
          <Footer />
        </div>
      )
      }
    </div>
  );
};
