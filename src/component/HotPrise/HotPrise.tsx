import { useContext, useEffect } from 'react';
import { ProductContext } from '../../ProductContext';
import { getPeople } from '../../api/api';

import './HotPrise.scss';

import { ProductsSlider } from '../ProductsSlider';

export const HotPrise = () => {
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    getPeople()
      .then(setProducts);
  });

  return (
    <div className="prise">
      <div className="container">

        <ProductsSlider
          title="Hot prices"
          sale
        />
      </div>
    </div>
  );
};
