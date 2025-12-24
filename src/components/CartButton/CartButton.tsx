import classNames from "classnames";
import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import './CartButton.scss';

type Props = {
  productId: string,
  size?: 'm';
}

export const CartButton: React.FC<Props> = ({
  productId,
  size,
}) => {
  const { cart, addToCart } = useContext(GlobalContext);

    const isProductInCart = useMemo(() => {
    return cart.some(cartItem => cartItem.id === productId);
  }, [cart, productId]);

  return (
    <button
      className={classNames(
        'button-add',
        size ? 'button-add--m' : '',
        { 'button-add--selected': isProductInCart },
      )}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addToCart(productId);
      }}
    >
      {isProductInCart ? 'Added' : 'Add to cart'}
    </button>
  );
}
