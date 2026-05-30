import { Link, useSearchParams } from 'react-router-dom';
import './Favorites.scss';
import { useFavorites } from '../../shared/context/Favorites/FavoritesContext';
import { CardList } from '../../shared/components/CardList';
import { ProductPage } from '../../shared/types/ProductPage';

export const Favorites = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <p className="empty-page">You don&apos;t have favorites products yet!</p>
    );
  }

  let filteredItemsList: ProductPage[];

  if (query) {
    filteredItemsList = favorites.filter(item =>
      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  } else {
    filteredItemsList = favorites;
  }

  return (
    <div className="favorites grid">
      <div className="breadcrumbs">
        <Link to={'/'}>
          <img src="img/shared/Home.svg" alt="" />
          <img
            src="img/shared/next-breadcrumbs.svg"
            alt=""
            className="next-breadcrumbs"
          />
        </Link>
        <Link to={`/favorites`}>Favorites</Link>
      </div>
      <h1 className="products-title">
        Favorites
        <span className="items-length">{favorites.length} items</span>
      </h1>
      <section className="favorites-items items grid">
        <CardList productsList={filteredItemsList} isFullPrice={false} />
      </section>
    </div>
  );
};
