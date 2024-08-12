import { useContext } from 'react';
import { Context } from '../../Store/Store';
import { CradList } from '../Cards/CardList';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { favorite } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <Link to={`/`}>
          <img src="img/icons/home_icon.svg" alt="home" />
        </Link>
        <span>
          <img src="img/icons/Arrow_Right.svg" alt="arrow_right" />
        </span>
        <Link to={`/favorites`}>Favorite</Link>
      </div>
      <h1>Favorites</h1>
      {favorite.length !== 0 && (
        <div className={styles.item}>{`${favorite.length} items`}</div>
      )}
      <div className="favorites-cards">
        {favorite.length !== 0 ? (
          <CradList products={favorite} />
        ) : (
          <div className={styles.empty}>
            <h1>Your Favorite products will be collected here</h1>
          </div>
        )}
      </div>
    </div>
  );
};
