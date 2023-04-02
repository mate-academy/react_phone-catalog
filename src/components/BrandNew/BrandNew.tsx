import { useContext } from 'react';
import { ProductBlock } from '../ProductBlock';
import { CatalogContext } from '../../context';

export const BrandNew = () => {
  const { products } = useContext(CatalogContext);

  const visibleProducts = products
    .filter(product => product.age <= 1 && product.discount === 0)
    .sort((a, b) => b.price - a.price);

  return (
    <section className="page__section brandNew">
      <div className="container">
        <ProductBlock
          sectionTitle="Brand new models"
          products={visibleProducts}
        />
      </div>
    </section>
  );
};
