import React, { useContext, useMemo } from 'react';
import './HomePage.scss';
import { Banner } from '../../shared/Banner';
import { Categories } from '../../shared/Categories';
import { ProductSlider } from '../../shared/ProductSlider';
import { GlobalContext } from '../../context/GlobalContext';

export const HomePage: React.FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const newProducts = useMemo(
    () => [...allProducts].filter(product => product.year === 2019),
    [allProducts],
  );

  const hotPrices = useMemo(
    () =>
      [...allProducts]
        .filter(product => product.price !== product.fullPrice)
        .sort(
          (product1, product2) =>
            product2.fullPrice -
            product2.price -
            (product1.fullPrice - product1.price),
        ),
    [allProducts],
  );

  return (
    <div className="home">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__banner">
        <Banner />
      </div>
      <div className="home__sections">
        <ProductSlider title="Brand new models" products={newProducts} />
        <Categories />
        <ProductSlider title="Hot prices" products={hotPrices} />
      </div>
    </div>
  );
};
