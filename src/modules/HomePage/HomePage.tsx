import React, { useEffect, useState } from 'react';
import { ProductListCarousel } from '../shared/ProductListCarousel';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ShopByCategory } from './ShopByCategory';
import { Product } from '../../types/Product';
import { client } from '../../api'; // тимчасово
import { PRODUCT_URL } from "../constants/URL's/URL's";

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
  // #region тимчасово
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
  }, []); // fetch
  // #endregion

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

  return (
    <main className="home-page">
      <h1 className="home-page__greeting primary-title">
        Welcome to Nice Gadgets&nbsp;store!
      </h1>

      <div className="home-page__container">
        <PicturesSlider />

        <ProductListCarousel
          title="Brand new models"
          products={newModels}
          dataLoaded={dataLoaded}
          discount={false}
        />

        <ShopByCategory
          amountPhones={phones.length}
          amountTablets={tablets.length}
          amountAccessories={accessories.length}
        />

        <ProductListCarousel
          title="Hot prices"
          products={unitHotPricesModels}
          dataLoaded={dataLoaded}
          discount
        />
      </div>
    </main>
  );
});
