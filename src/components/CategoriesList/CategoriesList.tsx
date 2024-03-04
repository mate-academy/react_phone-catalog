import './CategoriesList.scss';
import { Product } from '../../helpers/types/Product';
import { CategoryItem } from '../CategoryItem';

type Props = {
  products: Product[],
};

export const CategoriesList: React.FC<Props> = ({ products }) => {
  const getProductsAmount = (name: string) => {
    return products.filter((product) => product.category === name).length;
  };

  return (
    <ul
      data-cy="categoryLinksContainer"
      className="CategoriesList"
    >
      <li className="CategoriesList__item">
        <CategoryItem
          name="phones"
          title="Mobile phones"
          amount={getProductsAmount('phones')}
        />
      </li>

      <li className="CategoriesList__item">
        <CategoryItem
          name="tablets"
          title="Tablets"
          amount={getProductsAmount('tablets')}
        />
      </li>

      <li className="CategoriesList__item">
        <CategoryItem
          name="accessories"
          title="Accessories"
          amount={getProductsAmount('accessories')}
        />
      </li>
    </ul>
  );
};
