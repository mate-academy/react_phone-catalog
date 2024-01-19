import { ProductInCart } from '../../../helpers/types/ProductInCart';
import { CartItem } from './CartItem';

type CartItemsProps = {
  productsInCart: ProductInCart[]
  onRemoveClick: (id: string) => void
  onQuantityClick: (id: string, isMinus: boolean) => void
};

export const CartItems = ({
  productsInCart,
  onRemoveClick,
  onQuantityClick,
}: CartItemsProps) => (
  <ul className="cart-items">
    {productsInCart.map(
      productInCart => {
        const { product: { id } } = productInCart;

        return (
          <CartItem
            key={id}
            productInCart={productInCart}
            onRemoveClick={onRemoveClick}
            onQuantityClick={onQuantityClick}
          />
        );
      },
    )}
  </ul>
);
