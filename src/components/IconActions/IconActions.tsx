import CartIconLink from '../CartIconLink/CartIconLink';
import FavoritesIcon from '../FavoritesIcon/FavoritesIcon';

type Props = {
  variant: 'header' | 'mobileMenu';
};

export const IconsActions: React.FC<Props> = ({ variant }) => (
  <>
    <FavoritesIcon variant={variant} />
    <CartIconLink variant={variant} />
  </>
);

export default IconsActions;
