/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useMemo } from 'react';
import { Slider } from '../../components/Slider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider';
import { MainContext } from '../../context';
import { scrollToTop } from '../../helpers/scrollToTop';

import './home-page.scss';

export const HomePage = () => {
  const {
    setCurrentPage,
    products,
    phones,
    tablets,
    accessories,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Home');
    scrollToTop();
  }, []);

  const getHotPriceProducts = useMemo(() => {
    return [...products].sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
  }, [products]);

  const getNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  return (
    <div className="home__page">
      <Slider />

      <div className="product-list__wrapper product-list__wrapper--short">
        <ProductsSlider
          title="Hot prices"
          products={getHotPriceProducts}
        />
      </div>

      <ShopByCategory
        phonesQuantity={phones.length}
        tabletsQuantity={tablets.length}
        accessoriesQuantity={accessories.length}
      />

      <div className="product-list__wrapper product-list__wrapper--short">
        <ProductsSlider
          title="Brand new models"
          products={getNewProducts}
        />
      </div>
    </div>
  );
};
