import { useContext } from 'react';
import Phones from '../../img/Category/Category1.png';
import Tablets from '../../img/Category/Category2.png';
import Accessories from '../../img/Category/Category3.png';
import { ProductsContext } from '../../ProductsContext';

export const Category = () => {
  const { products } = useContext(ProductsContext);

  const phones = products.filter(product => product.type === 'phone');
  const tablets = products.filter(product => product.type === 'tablet');
  const accessories = products.filter(product => product.type === 'accessory');

  return (
    <div className="columns px-3">
      <div className="column">
        <figure className="image is-square mb-5 category__phones">
          <img src={Phones} alt="Phones" />
        </figure>
        <p className="has-text-weight-semibold is-size-4">Mobile Phones</p>
        <p className="has-text-grey-light">
          {phones.length ? `${phones.length} models` : 'no products yes'}
        </p>
      </div>
      <div className="column">
        <figure className="image is-square mb-5 category__tablets">
          <img src={Tablets} alt="Tablets" />
        </figure>
        <p className="has-text-weight-semibold is-size-4">Tablets</p>
        <p className="has-text-grey-light">
          {tablets.length ? `${tablets.length} models` : 'no products yes'}
        </p>
      </div>
      <div className="column">
        <figure className="image is-square mb-5 category__accessories">
          <img src={Accessories} alt="Accessories" />
        </figure>
        <p className="has-text-weight-semibold is-size-4">Accessories</p>
        <p className="has-text-grey-light">
          {accessories.length ? `${accessories.length} models` : 'no products yet'}
        </p>
      </div>
    </div>
  );
};
