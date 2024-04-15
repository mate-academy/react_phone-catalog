import './ShopByCategory.scss';
import { useContext } from 'react';
import { ProductContext } from '../../context/productContext';
import { Category } from '../Category';

export const ShopBy = () => {
  const { phonesDetails, tabletsDetails, accessoriesDetails } =
    useContext(ProductContext);

  return (
    <section className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__container">
        <Category title="phones" goods={phonesDetails} />
        <Category title="tablets" goods={tabletsDetails} />
        <Category title="acessories" goods={accessoriesDetails} />
      </div>
    </section>
  );
};
