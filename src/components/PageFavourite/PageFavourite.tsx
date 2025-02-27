import { Navigation } from '../Navigation/Navigation';
import './PageFavourite.scss';
import { useAppSelector } from '../../app/hooks';
import { useContext } from 'react';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';

export const PageFavorite = () => {
  const { lang } = useContext(LangContext);
  const { favouriteGoods } = useAppSelector(state => state.favourites);

  return (
    <div className="favourite">
      <Navigation />
      <h1 className="favourite__title">{translate('favourite.title', lang)}</h1>
      <p className="categories__text">{`${favouriteGoods.length} ${translate('categories.models', lang)}`}</p>
      {favouriteGoods.length > 0 ? (
        <div className="favourite__cards">
          {favouriteGoods.map(item => (
            <div className="favourite__card" key={item.id}>
              <Card item={item} discount={true} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Link to={'/'} className="not-found__button button">
            {translate('not-found.button', lang)}
          </Link>
          <img
            src="img/product-not-found.png"
            alt="img product-not-found"
            className="not-found__img"
          />
        </div>
      )}
    </div>
  );
};
