import { useCart } from 'context';
import { IconButton } from 'components/ui-kit';
import { CartProduct } from 'types/CartProduct';
import { IconButtonType } from 'types';
import './AddItems.scss';

type Props = {
  product: CartProduct,
};

export const AddItems: React.FC<Props> = ({
  product,
}) => {
  const { cart, addToCart } = useCart();

  const incrementQuantity = () => {
    const indexOfProductInCart = cart
      .findIndex(item => item.itemId === product.itemId);

    if (indexOfProductInCart !== -1) {
      const updatedCart = [...cart];

      updatedCart[indexOfProductInCart].cartQuantity += 1;
      addToCart(updatedCart);
    }
  };

  const decrementQuantity = () => {
    const indexOfProductInCart = cart
      .findIndex(item => item.itemId === product.itemId);

    if (indexOfProductInCart
      !== -1 && cart[indexOfProductInCart].cartQuantity > 1) {
      const updatedCart = [...cart];

      updatedCart[indexOfProductInCart].cartQuantity -= 1;

      addToCart(updatedCart);
    }
  };

  return (
    <div className="add-items">
      <IconButton
        type={IconButtonType.minus}
        disabled={product.cartQuantity < 2}
        onClickHandler={decrementQuantity}
      />

      <p className="add-items__quantity">
        {product.cartQuantity}
      </p>

      <IconButton
        type={IconButtonType.plus}
        onClickHandler={incrementQuantity}
      />
    </div>
  );
};
