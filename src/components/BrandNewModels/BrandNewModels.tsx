import React, { useContext } from 'react';
import './BrandNewModels.scss';
import { ProductContext } from '../../helpers/utils/productsContext';
import { ProductsSlider } from '../ProductsSlider';
import { getNewModels } from '../../helpers/utils/getNewModels';

type Props = {};

export const BrandNewModels: React.FC<Props> = () => {
  const { products } = useContext(ProductContext);

  const newModels = products ? getNewModels(products) : null;

  const title = 'Brand new models';

  return (
    <section className="hot-price">
      {newModels && <ProductsSlider title={title} products={newModels} />}
    </section>
  );
};
