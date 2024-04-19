import { useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs';
/* import { ProductCard } from '../../components/ProductCard'; */
import './Favorites.scss';

export const Favorites = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  return (
    <div className="container">
      <div className="favorites">
        <Breadcrumbs category="Fovarites" />
        <h1 className="favorites__title">Favorites</h1>
        <p className="favorites__quantity">{favorites.length} items</p>
        <div className="favorites__container">
          {/* {favorites.map(favorite => (
            <ProductCard key={favorite.id} product={favorite} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
