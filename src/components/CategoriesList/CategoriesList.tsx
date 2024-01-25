import { Product } from '../../helpers/types/Product';
import { TypeProduct } from '../../helpers/types/TypeProduct';
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
    <div
      className="CategoriesList"
      data-cy="categoryLinksContainer"
    >
      <CategoryItem
        name="phones"
        title="Mobile phones"
        amount={getProductsAmount(TypeProduct.phone)}
      />
      <CategoryItem
        name="tablets"
        title="Tablets"
        amount={getProductsAmount(TypeProduct.tablet)}
      />
      <CategoryItem
        name="accessories"
        title="Accessories"
        amount={getProductsAmount(TypeProduct.accessory)}
      />
    </div>
  );
};
