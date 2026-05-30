import { Banner } from '../Banner/Banner';
import '../../../styles/_container.scss';
import { useContext, useEffect, useState } from 'react';
import { NewModels } from '../NewModels/NewModels';
import { Categories } from '../Categories';
import { GlobalContext } from '../../../app/store/GlobalContext';
import { HotPrices } from '../HotPrices';

export const HomePage = () => {
  const { products } = useContext(GlobalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newProducts = products.filter(product =>
    product.name.includes('iPhone 14'),
  );

  const hotPricesProducts = products.filter(product =>
    product.name.includes('iPhone 13') || product.name.includes('iPhone 11'),
  );

  return (
    <section className="container">
      <Banner />
      <NewModels products={newProducts} />
      <Categories products={products} />
      <HotPrices products={hotPricesProducts} />
    </section>
  );
};
