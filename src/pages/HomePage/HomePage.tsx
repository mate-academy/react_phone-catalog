/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect } from 'react';
import { Slider } from '../../components/Slider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Promo } from '../../components/Promo';
import { MainContext } from '../../context';

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
  }, []);

  return (
    <>
      <Slider />

      <div className="product-list__wrapper product-list__wrapper--short">
        <Promo
          title="Hot prices"
          products={products}
        />
      </div>

      <ShopByCategory
        phonesQuantity={phones.length}
        tabletsQuantity={tablets.length}
        accessoriesQuantity={accessories.length}
      />

      <div className="product-list__wrapper product-list__wrapper--short">
        <Promo
          title="Brand new models"
          products={products}
        />
      </div>
    </>
  );
};
