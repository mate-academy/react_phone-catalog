import styles from '../FavouritesLink/FavouritesLink.module.scss';
import iconStyles from '../Icon/Icon.module.scss';
import { Link } from 'react-router-dom';
enum size {
  small = 'sm',
  large = 'lg',
}

type FavouritesLinkProps = {
  className?: string;
  iconSize?: size;
};
export const FavouritesLink: React.FC<FavouritesLinkProps> = ({
  className = '',
  iconSize = size.small,
}: FavouritesLinkProps) => {
  return (
    <Link
      to="favorites"
      className={`${
        iconSize === size.large ? iconStyles['icon--large'] : iconStyles.icon
      }
              ${styles['icon--favourites']} ${className}`}
      aria-label="Favourites"
    />
  );
};
