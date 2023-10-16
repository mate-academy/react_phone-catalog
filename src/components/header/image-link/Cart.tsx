import { CART_LINK } from '../../../helpers/constants/Links';
import { ImageLink } from './ImageLink';

type CartProps = {
  count?: number
};

export const Cart = ({ count = -1 }: CartProps) => (
  <ImageLink
    alternativeName="Cart"
    imageSource="img/header/cart.svg"
    link={CART_LINK}
    itemsCount={count}
  />
);

Cart.defaultProps = {
  count: -1,
};
