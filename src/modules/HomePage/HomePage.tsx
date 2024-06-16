import React, { useEffect, useState } from 'react';
import { ProductListCarousel } from '../shared/ProductListCarousel';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ShopByCategory } from './ShopByCategory';
import { Product } from '../../types/Product';
import { client } from '../../api';
import { PRODUCT_URL } from "../constants/URL's/URL's";
import { getMaxDifference } from '../../services/getMaxDifference';
import { ReloadButton } from '../shared/Buttons/MoveButtons';

export const HomePage = React.memo(() => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const latestPhones = 'iphone 14';

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  useEffect(() => {
    setDataLoaded(false);
    setError(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        setProducts(data);
        setDataLoaded(true);
      })
      .catch(() => setError(true));
  }, []);

  const newModels = phones
    .filter(phone => phone.name.toLowerCase().includes(latestPhones))
    .sort((phone1, phone2) => phone2.fullPrice - phone1.fullPrice);

  const hotPricesPhones = getMaxDifference(phones, latestPhones);
  const hotPricesTablets = getMaxDifference(tablets, latestPhones);
  const hotPricesAccessories = getMaxDifference(accessories, latestPhones);

  const unitHotPricesModels = [
    ...hotPricesPhones,
    ...hotPricesTablets,
    ...hotPricesAccessories,
  ].sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return !error ? (
    <div className="something-wrong">
      <h1 className="something-wrong__title primary-title">Something wrong</h1>
      <ReloadButton />
    </div>
  ) : (
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
