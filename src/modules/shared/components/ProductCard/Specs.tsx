import { Product } from '../../../../api/types';
import scss from './Specs.module.scss';

interface Props {
  product: Product;
}

export const Specs: React.FC<Props> = ({ product }) => {
  return (
    <dl className={scss.specs}>
      <div className={scss.specs__line}>
        <dt className={`${scss.specs__text} ${scss.specs__type}`}>Screen</dt>
        <dd className={`${scss.specs__text} ${scss.specs__value}`}>
          {product.screen}
        </dd>
      </div>
      <div className={scss.specs__line}>
        <dt className={`${scss.specs__text} ${scss.specs__type}`}>Capacity</dt>
        <dd className={`${scss.specs__text} ${scss.specs__value}`}>
          {product.capacity}
        </dd>
      </div>
      <div className={scss.specs__line}>
        <dt className={`${scss.specs__text} ${scss.specs__type}`}>RAM</dt>
        <dd className={`${scss.specs__text} ${scss.specs__value}`}>
          {product.ram}
        </dd>
      </div>
    </dl>
  );
};
