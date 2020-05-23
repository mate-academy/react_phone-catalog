import React, { useEffect, useState } from 'react';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getGoods } from './helpers';
import { BannerSlider } from './components/Banner';
import { CardSlider } from './components/CardSlider';

export const App = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadGoods = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await getGoods();

      setGoods(data);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage(String(error));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadGoods();
  }, []);

  return (
    <>
      <Header />
      <BannerSlider />
      <CardSlider cards={goods.slice(0, 8)} title="Hot prices" />
      <div className="container">
        <section className="section">
          <h1>Main Page</h1>
        </section>
        {errorMessage && <div>{errorMessage}</div>}
        {isLoading && <div>Loading...</div>}
        {/* {isLoaded && <GoodsList goods={goods} />} */}
        {console.log(goods, isLoaded)}
      </div>
      <Footer />
    </>
  );
};
