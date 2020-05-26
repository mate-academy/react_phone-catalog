import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getGoods } from './helpers';
import { GoodsSection } from './components/GoodsSection';
import { GoodPage } from './components/GoodPage';
import { HomePage } from './components/HomePage';

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
      const preparedData = data.filter(product => product.type);

      setGoods(preparedData);
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
      <div className="container">
        {errorMessage && <div>{errorMessage}</div>}
        {isLoading && isLoaded && ''}
        <Switch>
          <Route path="/" exact render={() => <HomePage goods={goods} />} />
          <Route path="/:section" exact render={() => <GoodsSection goods={goods} />} />
          <Route path="/:section/:good" exact render={() => <GoodPage goods={goods} />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
