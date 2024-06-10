import React, { useContext } from 'react';
import './HotPrice.scss';
import { ProductsSlider } from '../ProductsSlider';
import { ProductContext } from '../../helpers/utils/productsContext';
import { getHotPriceProducts } from '../../helpers/utils/getHotPriceProducts';
import { Loader } from '../Loader';

type Props = {};

export const HotPrice: React.FC<Props> = () => {
  const { products } = useContext(ProductContext);

  const hotPriceProducts = products ? getHotPriceProducts(products) : null;

  const title = 'Hot prices';

  return (
    <section className="hot-price">
      {hotPriceProducts ? (
        <ProductsSlider title={title} products={hotPriceProducts} />
      ) : (
        <Loader />
      )}
    </section>
  );
};
