import { Navigation } from '../Navigation/Navigation';
import './PageFavorite.scss';
import { useAppSelector } from '../../app/hooks';
import { useContext } from 'react';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';

export const PageFavorite = () => {
  const { lang } = useContext(LangContext);
  const { favoriteGoods } = useAppSelector(state => state.favorites);

  return (
    <div className="favorite">
      <Navigation />
      <h1 className="favorite__title">{translate('favorite.title', lang)}</h1>
      <p className="categories__text">{`${favoriteGoods.length} ${translate('categories.models', lang)}`}</p>
      {favoriteGoods.length > 0 ? (
        <div className="favorite__cards">
          {favoriteGoods.map(item => (
            <div className="favorite__card" key={item.id}>
              <Card item={item} discount={true} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Link to={'/'} className="not-found__button button">
            {translate('favourite.no-items', lang)}
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
