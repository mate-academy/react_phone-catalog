import { Link } from "react-router-dom";

import styles from './FavouritesHeader.module.scss';
import { useAppSelector } from "../../../../app/store/hooks";

export const FavouritesHeader = () => {
  const fevorites = useAppSelector(state => state.favourites.items);
  return (
    <div className={styles.header}>
      <Link to={`/`} className={styles.headerBackLink}>
        <img className={styles.headerLinkImage} src="src/assets/icons/arrow-left.svg"/>
        <span className={styles.headerLinkText}>Back</span>
      </Link>
      <h1 className={styles.headerTitle}>
        Favourites
      </h1>
      <p className={styles.headerQuantity}>{fevorites.length} models</p>
    </div>
  );
};
