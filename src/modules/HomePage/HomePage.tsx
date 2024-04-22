import React, {
  // useContext,
  useEffect,
  useState,
} from 'react';
import { ProductListCarousel } from './ProductListCarousel';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ShopByCategory } from './ShopByCategoty';
import { Product } from '../../types/Product';
import { client } from '../../api'; // тимчасово
// import { ProductContext } from '../../store/ProductContext';

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

export const HomePage = React.memo(() => {
  // const { dataLoaded, phones, tablets, accessories } =
  //   useContext(ProductContext);

  // #region тимчасово
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const phones = products.filter(product => product.category === 'phones');
  // const phones = products
  //   .filter(product => product.category === 'phones')
  //   .slice(0, 50);
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
  }, []); // fetch
  // #endregion

  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  const newModels = phones
    .filter(phone => phone.name.toLowerCase().includes('iphone 14'))
    .sort((phone1, phone2) => phone2.fullPrice - phone1.fullPrice);

  const hotPricesPhones = maxDifference(phones);
  const hotPricesTablets = maxDifference(tablets);
  const hotPricesAccessories = maxDifference(accessories);

  const unitHotPricesModels = maxDifference([
    ...hotPricesPhones,
    ...hotPricesTablets,
    ...hotPricesAccessories,
  ]);

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
});
