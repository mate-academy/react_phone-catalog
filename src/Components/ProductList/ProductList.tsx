import { useLocation } from 'react-router-dom';
import { Product } from '../../Helpers/Types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

type Props = {
  products: Product [],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const isFavPage = location.pathname === '/favourites';

  return (
    <div
      className={isFavPage ? ('product-fav') : ('product-list')}
      data-cy="productList"
    >
      <ProductCard products={products} />
    </div>
  );
};
