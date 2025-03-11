import styles from './PageFavorite.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import { Navigation } from '../Navigation/Navigation';
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
    <div className={styles.favorite}>
      <Navigation />
      <h1 className={styles.favorite__title}>
        {translate('favorite.title', lang)}
      </h1>
      <p
        className={styles.favorite__text}
      >{`${favoriteGoods.length} ${translate('categories.models', lang)}`}</p>
      {favoriteGoods.length > 0 ? (
        <div className={styles.favorite__cards}>
          {favoriteGoods.map(item => (
            <div className={styles.favorite__card} key={item.id}>
              <Card item={item} discount={true} fullwidth={true} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Link
            to={'/'}
            className={`${styles.favorite__notFound__button} ${stylesBtn.button}`}
          >
            {translate('not-found.button', lang)}
          </Link>
          <img
            className={styles.favorite__empty__img}
            src="img/product-not-found.png"
            alt="img product-not-found"
          />
        </div>
      )}
    </div>
  );
};
