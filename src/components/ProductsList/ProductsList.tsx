import { Phone } from '../../types/phone';
import { ProductCard } from '../ProductCard';

import './style.scss';

type Props = {
  data: Phone[]
};

export const ProductsList: React.FC<Props> = ({ data }) => {
  return (
    <ul
      className="products__list"
      data-cy="productList"
    >
      {data.map(item => (
        <li key={item.id} className="products__item">
          <ProductCard data={item} />
        </li>
      ))}
    </ul>
  );
};
