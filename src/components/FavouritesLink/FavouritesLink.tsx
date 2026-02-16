import { Link } from 'react-router-dom';
import styles from '../FavouritesLink/FavouritesLink.module.scss';

type FavouritesLinkProps = {
  className?: string;
};

export const FavouritesLink: React.FC<FavouritesLinkProps> = ({
  className,
}) => {
  return (
    <Link
      to="favorites"
      className={`${styles.icon} ${styles['icon--favourites']} ${className ?? ''}`}
    ></Link>
  );
};
