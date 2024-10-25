import { ProductList } from '../../components/productList/ProductList';
import { AllProduct } from '../../types/UnionType';
import { useAppSelector } from '../../utils/hooks';
import './FavoritePage.scss';

export const FavoritePage: React.FC = () => {
  const favorites = useAppSelector(
    state => state.favorites.data,
  ) as AllProduct[];

  return (
    <div className="favoritePage">
      <h1 className="favoritePage__title">Favorites</h1>
      <span className="favoritePage__modelCount">
        {`${favorites.length || 0} items`}
      </span>
      <ProductList products={favorites} />
    </div>
  );
};
