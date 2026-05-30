// eslint-disable-next-line max-len
import { ProductCard } from '../../shared/Shared_Components/ProductCard/ProductCard';
import { UpdatedProduct } from '../../shared/Types/types';

interface Props {
  favourites: UpdatedProduct[];
}

export const FavouritesList: React.FC<Props> = ({ favourites }) => {
  return (
    <div className="product-page">
      <div className="product-page__list">
        {favourites.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
