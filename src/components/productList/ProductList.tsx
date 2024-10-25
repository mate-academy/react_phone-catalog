import { AllProduct } from '../../types/UnionType';
import { useAppSelector } from '../../utils/hooks';
import { Card } from '../card/Card';
import './ProductList.scss';

interface Props {
  products: AllProduct[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const favoritesIds = useAppSelector(state => state.favorites.data).map(
    (item: AllProduct) => ('itemId' in item ? item.itemId : item.id),
  );

  return (
    <div className="productList">
      {products.map(product => {
        return (
          <Card
            key={product.id}
            card={product}
            showSale={true}
            favorite={favoritesIds.includes(
              'itemId' in product ? product.itemId : product.id,
            )}
          />
        );
      })}
    </div>
  );
};
