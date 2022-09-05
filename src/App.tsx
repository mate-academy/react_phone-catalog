import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Novelties } from './components/Novelties';
import { Footer } from './components/Footer';
import { HotPrice } from './components/HotPrice';
import { getPhones } from './utils/api';
import { Phone } from './types/Phone';
import { NewModels } from './components/NewModels';
import { Category } from './components/Category';

import './App.scss';
import { isLocalStoragehas, useLocalStorage } from './utils/localStorage';

const App = () => {
  const [products, setProducts] = useState<Phone[]>();
  const [favorite, setFavorite] = useLocalStorage('favorite');
  const [withdraw, setWithdraw] = useLocalStorage('withdraw');

  useEffect(() => {
    getPhones().then((phones: Phone[]) => setProducts(phones));
  }, []);

  const preparedPhone = useMemo(() => {
    if (products) {
      const productsId = isLocalStoragehas(
        'favorite',
        products.map((curr:Phone) => curr.id),
      );

      if (typeof productsId !== 'boolean') {
        return products.map((curr, id) => (
          { ...curr, favorite: productsId[id] }));
      }
    }

    return [];
  }, [products]);

  return (
    <>
      <Header favoriteSize={favorite.length} withdrawSize={withdraw.length} />
      <main className="main">
        <div className="container">
          <Novelties />
          {products && (
            <>
              <HotPrice
                products={preparedPhone}
                addFavorite={setFavorite}
                addWithdraw={setWithdraw}
              />
              <Category />
              <NewModels
                products={preparedPhone}
                addFavorite={setFavorite}
                addWithdraw={setWithdraw}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
