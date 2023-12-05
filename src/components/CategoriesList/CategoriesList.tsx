import { Product } from '../../helpers/types/Product';
import { CategoryItem } from '../CategoryItem';
import './CategoriesList.scss';

type Props = {
  products: Product[],
};

export const CategoriesList: React.FC<Props> = ({ products }) => {
  const getProductsAmount = (name: string) => {
    return products.filter((product) => product.type === name).length;
  };

  return (
    <ul
      className="CategoriesList"
      data-cy="categoryLinksContainer"
    >
      <li className="CategoriesList__item">
        <CategoryItem
          name="phones"
          title="Mobile phones"
          amount={getProductsAmount('phone')}
        />
      </li>
      <li className="CategoriesList__item">
        <CategoryItem
          name="tablets"
          title="Tablets"
          amount={getProductsAmount('tablet')}
        />
      </li>
      <li className="CategoriesList__item">
        <CategoryItem
          name="accessories"
          title="Accessories"
          amount={getProductsAmount('accessory')}
        />
      </li>
    </ul>
  );
};
