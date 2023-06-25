import './CartButton.scss';

type CartButtonProps = {
  width: number;
  height: number;
};

export const CartButton = ({ width, height }: CartButtonProps) => (
  <button style={{ width, height }} className="cart-button" type="button">
    Add to cart
  </button>
);
