import { Link } from 'react-router-dom';
import { useShopContext } from '../../context/ShopContext';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';

const HOME_PATH =
  'M2.52988 8.01633L7.54504 3.00117C7.79727 2.74894 8.20468 ' +
  '2.74894 8.45691 3.00117L13.4721 8.01633C13.7243 8.26855 ' +
  '13.7243 8.67597 13.4721 8.92819C13.2198 9.18042 12.8124 ' +
  '9.18042 12.5602 8.92819L11.9998 8.36776V12.6667C11.9998 ' +
  '13.403 11.4028 14 10.6664 14H9.33313V9.99999H6.66646V14H5.33313C4.59675 ' +
  '14 3.9998 13.403 3.9998 12.6667V8.3683L3.44181 8.92629C3.18958 ' +
  '9.17852 2.78217 9.17852 2.52994 8.92629C2.27771 8.67407 ' +
  '2.27766 8.26666 2.52988 8.01633Z';

export const FavoritesPage = () => {
  const { favorites } = useShopContext();

  return (
    <div className={styles.page}>
      {/* Хлебные крошки (Breadcrumbs) */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.homeLink} aria-label="Home">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={HOME_PATH} fill="var(--c-primary)" />
          </svg>
        </Link>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.separator}
        >
          <path
            d="M5.5 3L10.5 8L5.5 13"
            stroke="var(--c-icons)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className={styles.currentPath}>Favourites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length > 0 ? (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>Your favorites list is empty</h2>
          <p>Add some products to see them here.</p>
        </div>
      )}
    </div>
  );
};
