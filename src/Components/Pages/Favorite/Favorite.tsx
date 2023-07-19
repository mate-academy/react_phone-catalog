import './Favorite.scss';
import { Link } from 'react-router-dom';
import { BlockFavorite } from './BlockFavorite';
import HomeImage from './FavoriteImage/Home.svg';
import Arrowimage from './FavoriteImage/Arrow.svg';
import { useFavoriteContext } from '../../../FavoriteContext';

export const Favorite = () => {
  const { favoritesLength } = useFavoriteContext();

  return (
    <>
      <div className="mainBlockForFavorite">
        <div className="block-for-svg">
          <Link to="/">
            <div className="block-for-svg-home">
              <img className="icon" src={HomeImage} alt="HomeImage" />
            </div>
          </Link>

          <div className="block-for-svg-home-arrow">
            <img className="icon" src={Arrowimage} alt="Arrowimage" />
          </div>

          <p className="block-forPageNotFound__text-1">Favourites</p>
        </div>
        <div className="favoriteMainBlock">
          <h1
            className="favoriteMainBlock__h1"
          >
            Favourites
          </h1>
          <p className="favoriteMainBlock__text">{`${favoritesLength} items`}</p>
        </div>
      </div>

      <BlockFavorite />
    </>
  );
};
