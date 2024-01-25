import { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';
import { ProductCard } from '../components/ProductCard/ProductCard';
import '../style/Favourites.scss';
import { Breadcrumbs } from '../components/BreadCrumbs/BreadCrumbs';

export const FavouritesPage: React.FC = () => {
  const { favouritesItems } = useContext(FavouritesContext);
  const totalFavouritesCount = favouritesItems.length;

  return (
    <div className="favourites__page">
      <Breadcrumbs />
      <h1 className="favourites__page__title">Favourites</h1>
      <p className="favourites__page__item">
        {totalFavouritesCount}
        {' '}
        items
      </p>
      <div className="favourites__page__items">
        {favouritesItems.length > 0 ? (
          favouritesItems.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))
        ) : (
          <p className="favourites__page__empty">Your list is empty</p>
        )}
      </div>
    </div>
  );
};
