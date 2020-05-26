import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import { getGoods } from './helpers';
import { FavoritesContextWrapper } from './components/Favorites';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GoodsSection } from './components/GoodsSection';
import { GoodPage } from './components/GoodPage';
import { HomePage } from './components/HomePage';
import { Favorites } from './components/Favorites/Favorites';

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
      <FavoritesContextWrapper>
        <Header />
        <div className="container">
          {errorMessage && <div>{errorMessage}</div>}
          {isLoading && isLoaded && ''}
          <Switch>
            <Route path="/" exact render={() => <HomePage goods={goods} />} />
            <Route path="/favorites" render={() => <Favorites goods={goods} />} />
            <Route path="/:section" exact render={() => <GoodsSection goods={goods} />} />
            <Route path="/:section/:good" exact render={() => <GoodPage goods={goods} />} />
          </Switch>
        </div>
      </FavoritesContextWrapper>
      <Footer />
    </>
  );
};
