import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults';
import { useMyContext } from '../context/context';
import { FavouritesList } from '../components/FavouritesList';

export const FavoritesPage = () => {
  const { favourites } = useMyContext();

  return (
    <div className="page">
      <div className="page__path">
        <Link to="/" className="page__path--home">
          <img
            alt="arrowTop"
            src="./img/home.svg"
            className="page__path--home-image"
          />
        </Link>
        <img
          alt="arrowTop"
          src="./img/arrowRight.svg"
          className="page__path--prev"
        />
        <span className="page__path--page SmallText">Favourites</span>
      </div>

      {favourites && favourites.length === 0
        ? (<NoResults title="Favourites" />)
        : (<h1 className="page__title h1">Favourites</h1>)}
      {!favourites && (<Loader />)}
      {favourites && favourites.length > 0 && (
        <FavouritesList products={favourites} />
      )}
    </div>
  );
};
