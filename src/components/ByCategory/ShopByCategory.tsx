import './ShopByCategory.scss';
import { useContext } from 'react';
import { ProductContext } from '../../context/productContext';
import { Category } from '../Category';

export const ShopBy = () => {
  const { products } = useContext(ProductContext);

  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__container">
        <Category title="phones" goods={phones} />
        <Category title="tablets" goods={tablets} />
        <Category title="accessories" goods={accessories} />
      </div>
    </section>
  );
};
