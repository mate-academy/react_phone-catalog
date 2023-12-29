import './Favourites.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { BackLink } from '../BackLink/BackLink';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';

export const Favourites = () => {
  const favouriteProducts = useAppSelector(state => state.favourites.items);

  return (
    <div className="favourites">
      <BackLink text="Favourites" />
      <h1 className="favourites__title">Favourites</h1>
      <h2 className="favourites__subtitle">{`${favouriteProducts.length} items`}</h2>
      <div className="favourites-container">
        {favouriteProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
