import { Link } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';
// eslint-disable-next-line max-len
import { PhoneDetails } from '../../modules/ProductDetails/interfaces/PhoneDetailsInterface';
import { useFavorites } from '../../modules/Favorites/context/FavoritesContext';

const pageTitles: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favorites',
};

interface BreadCrumbsProps {
  category?: string;
  product?: PhoneDetails;
  showFavorites?: boolean;
}
export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  category,
  product,
  showFavorites = false,
}) => {
  const { favorites } = useFavorites();

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs_link}>
            <img
              src="./img/icons/Home.png"
              alt="Home icon"
              className={styles.breadcrumbs_icon}
            />
          </Link>
        </li>

        {showFavorites && (
          <li className={styles.breadcrumbs__item}>
            <img
              src="./img/icons/right_white_arrow.svg"
              alt="arrow right"
              className={styles.breadcrumbs_arrow}
            />
            <Link to="/favorites" className={styles.breadcrumbs__link}>
              Favorites
            </Link>
            {favorites.length > 0 && (
              <span className={styles.breadcrumbs__count}>
                {favorites.length} items
              </span>
            )}
          </li>
        )}

        {category && (
          <li className={styles.breadcrumbs__item}>
            <img
              src="./img/icons/right_white_arrow.svg"
              alt="arrow"
              className={styles.breadcrumbs_arrow}
            />
            <Link to={`/${category}`} className={styles.breadcrumbs__link}>
              {pageTitles[category] || category}
            </Link>
          </li>
        )}

        {product && (
          <li className={styles.breadcrumbs__item}>
            <img
              src="./img/icons/right_white_arrow.svg"
              alt="arrow"
              className={styles.breadcrumbs_arrow}
            />
            <span className={styles.breadcrumbs_active}>{product.name}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};
