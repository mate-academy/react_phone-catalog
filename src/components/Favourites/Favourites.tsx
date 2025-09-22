import styles from './Favourites.module.scss';
import { NavLink } from 'react-router-dom';
import { useFavourites } from './FavouritesContext';
import home from '../../assets/icons/home.svg';
import goto from '../../assets/icons/arrowRight.svg';
import { ProductItem } from '../ProductItem/ProductItem';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <main className={styles.favourites}>
      <div className={styles.productLink}>
        <NavLink to="/">
          <img src={home} alt="home" />
        </NavLink>
        <span>
          <img src={goto} alt="goto" />
        </span>
        <p className={styles.productLink__title}>Favourites</p>
      </div>
      <h1 className={styles.page__title}>Favourites</h1>
      <h1
        className={styles.page__description}
      >{`${favourites.length} items`}</h1>
      {favourites.length === 0 ? (
        <div className="none">
          <img
            src="img/product-not-found.png"
            alt="Favourites have not been chosen"
            className="product__empty"
          />
        </div>
      ) : (
        <div className={styles.favourites__card}>
          {favourites.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
