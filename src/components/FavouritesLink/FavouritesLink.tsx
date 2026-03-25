import styles from '../FavouritesLink/FavouritesLink.module.scss';
import iconStyles from '../Icon/Icon.module.scss';
import { Link } from 'react-router-dom';
enum Size {
  small = 'sm',
  large = 'lg',
}

type FavouritesLinkProps = {
  to?: string;
  className?: string;
  iconSize?: Size;
  handleMenuClick?: () => void;
};
export const FavouritesLink: React.FC<FavouritesLinkProps> = ({
  to = '',
  className = '',
  iconSize = Size.small,
  handleMenuClick = () => {},
}: FavouritesLinkProps) => {
  return (
    <Link
      to={to}
      className={`${
        iconSize === Size.large ? iconStyles['icon--large'] : iconStyles.icon
      }
              ${styles['icon--favourites']} ${className}`}
      aria-label="Favourites"
      onClick={handleMenuClick}
    />
  );
};
