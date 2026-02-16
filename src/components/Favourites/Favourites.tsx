import styles from './Favourites.module.scss';
import { NavLink } from 'react-router-dom';
import { useFavourites } from './FavouritesContext';
import home from '../../assets/icons/home.svg';
import homeLight from '../../assets/icons/homeLight.svg';
import goto from '../../assets/icons/arrowRight.svg';
import gotoLight from '../../assets/icons/arrowRightLightD.svg';
import notFound from '../../../public/img/product-not-found.png';
import { ProductItem } from '../ProductItem/ProductItem';
import { useTheme } from '../Themes';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();
  const { theme } = useTheme();
  const isBasicBlack = theme === 'dark';

  return (
    <main className={styles.favourites}>
      <div className={styles.productLink}>
        <NavLink to="/">
          <img src={isBasicBlack ? home : homeLight} alt="home" />
        </NavLink>
        <span>
          <img src={isBasicBlack ? goto : gotoLight} alt="goto" />
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
            src={notFound}
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
