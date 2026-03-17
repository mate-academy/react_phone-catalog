import styles from '../FavouritesLink/FavouritesLink.module.scss';
import iconStyles from '../Icon/Icon.module.scss';
import { Link } from 'react-router-dom';
enum Size {
  small = 'sm',
  large = 'lg',
}

type FavouritesLinkProps = {
  className?: string;
  iconSize?: Size;
};
export const FavouritesLink: React.FC<FavouritesLinkProps> = ({
  className = '',
  iconSize = Size.small,
}: FavouritesLinkProps) => {
  return (
    <Link
      to=""
      className={`${
        iconSize === Size.large ? iconStyles['icon--large'] : iconStyles.icon
      }
              ${styles['icon--favourites']} ${className}`}
      aria-label="Favourites"
    />
  );
};
