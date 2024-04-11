import { useEffect, useState } from 'react';
import { NewModelsListSlider } from './NewModelsListSlider';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ShopByCategory } from './ShopByCategoty';
import { client } from '../../api';
import { Product } from '../../types/Product';
import { HotPrices } from './HotPrices';

const PRODUCT_URL = 'products.json';

export const HomePage = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  useEffect(() => {
    setDataLoaded(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        setProducts(data);
        setDataLoaded(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // listener window size

  useEffect(() => {
    if (windowSize !== document.documentElement.clientWidth) {
      setWindowSize(document.documentElement.clientWidth);
    }
  }, [windowSize]); // adaptive window size with scroll line

  return (
    <main className="home-page">
      <h1 className="home-page__greeting primary-title">
        Welcome to Nice Gadgets&nbsp;store!
      </h1>

      <div className="home-page__container">
        <PicturesSlider windowSize={windowSize} />

        <NewModelsListSlider
          windowSize={windowSize}
          phones={phones}
          dataLoaded={dataLoaded}
        />

        <ShopByCategory
          phones={phones.length}
          tablets={tablets.length}
          accessories={accessories.length}
        />

        <HotPrices />
      </div>
    </main>
  );
};
