import { IconButton } from '../../../../bits';
import { IconButtonType } from '../../../../types';
import './AddItems.scss';
import { CartProduct } from '../../../../types/CartProduct';
import { useCart } from '../../../../context/cartContext';

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
        handler={decrementQuantity}
      />

      <p className="add-items__quantity">
        {product.cartQuantity}
      </p>

      <IconButton
        type={IconButtonType.plus}
        handler={incrementQuantity}
      />
    </div>
  );
};
