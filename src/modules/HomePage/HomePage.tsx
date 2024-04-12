import { useEffect, useState } from 'react';
import { ProductListCarousel } from './ProductListCarousel';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ShopByCategory } from './ShopByCategoty';
import { client } from '../../api';
import { Product } from '../../types/Product';

const PRODUCT_URL = 'products.json';

function maxDifference(products: Product[]) {
  const result = products
    .slice()
    .sort((product1, product2) => {
      return (
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price)
      );
    })
    .slice(0, 30);

  return result;
}

export const HomePage = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  const newModels = phones.filter(phone =>
    phone.name.toLowerCase().includes('iphone 14'),
  );

  const hotPricesPhones = maxDifference(phones);
  const hotPricesTablets = maxDifference(tablets);
  const hotPricesAccessories = maxDifference(accessories);

  const unitHotPricesModels = maxDifference([
    ...hotPricesPhones,
    ...hotPricesTablets,
    ...hotPricesAccessories,
  ]);

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

  // console.log(unitHotPricesModels);

  return (
    <main className="home-page">
      <h1 className="home-page__greeting primary-title">
        Welcome to Nice Gadgets&nbsp;store!
      </h1>

      <div className="home-page__container">
        <PicturesSlider windowSize={windowSize} />

        <ProductListCarousel
          title="Brand new models"
          windowSize={windowSize}
          products={newModels}
          dataLoaded={dataLoaded}
          hotPrice={false}
        />

        <ShopByCategory
          phones={phones.length}
          tablets={tablets.length}
          accessories={accessories.length}
        />

        <ProductListCarousel
          title="Hot prices"
          windowSize={windowSize}
          products={unitHotPricesModels}
          dataLoaded={dataLoaded}
          hotPrice
        />
      </div>
    </main>
  );
};
