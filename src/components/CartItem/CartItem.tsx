import type { Product } from '../../types/Product';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import {
  getImageScale,
  CART_ITEM_SCALE_CONFIG,
} from '../../utils/getImageScale';

interface Props {
  product: Product;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const { removeFromCart, getQuantity, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();
  const quantity = getQuantity(product);

  const handleNavigateToProduct = () => {
    const path = `/${product.category}/${product.itemId}`;
    navigate(path);
  };

  const handleRemove = () => {
    removeFromCart(product);
  };

  const handleIncrease = () => {
    increaseQuantity(product);
  };

  const handleDecrease = () => {
    decreaseQuantity(product);
  };

  return (
    <div
      className="cart-item-card w-full min-w-[288px] bg-card-background dark:bg-dark-card-background border
      border-elements dark:border-dark-elements shadow-sm p-4 relative flex flex-col tablet:flex-row 
      mobile:items-center mobile:justify-between mobile:gap-4"
    >
      <div className="cart-item-header w-full flex items-center gap-4 tablet:gap-6 desktop:gap-8">
        <button
          className="remove-button w-8 h-8 flex items-center justify-center border border-transparent text-elements dark:text-dark-elements hover:text-error-red dark:hover:text-error-red transition-colors text-xl font-bold cursor-pointer mobile:order-1 bg-transparent rounded-none"
          onClick={handleRemove}
        >
          ×
        </button>

        <div
          className="product-image-wrapper w-20 h-20 flex-shrink-0 cursor-pointer mobile:order-2 flex items-center justify-center"
          onClick={handleNavigateToProduct}
        >
          <img
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={product.name}
            className={`product-image object-contain transform ${getImageScale(product, CART_ITEM_SCALE_CONFIG)}`}
          />
        </div>

        <div
          className="product-name-wrapper flex-1 min-w-0 cursor-pointer mobile:order-3"
          onClick={handleNavigateToProduct}
        >
          <h3 className="product-name text-default text-primary dark:text-dark-primary hover:text-secondary dark:hover:text-dark-secondary transition-colors mobile:text-lg">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="cart-item-controls-price flex w-full items-center mt-4 mobile:mt-0 mobile:flex-row justify-between tablet:gap-6">
        <div className="quantity-controls flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center border border-elements dark:border-dark-elements hover:border-primary dark:hover:border-purple cursor-pointer text-primary dark:text-dark-primary transition-colors bg-transparent p-0 rounded-none"
          >
            −
          </button>
          <span className="quantity-display w-8 text-center text-default font-medium text-primary dark:text-dark-primary">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center border border-elements dark:border-dark-elements hover:border-primary dark:hover:border-purple cursor-pointer text-primary dark:text-dark-primary transition-colors bg-transparent p-0 rounded-none"
          >
            +
          </button>
        </div>

        <div className="product-price-wrapper text-right">
          <div className="product-price text-price font-bold text-primary dark:text-dark-primary w-16 text-right">
            ${product.price * quantity}
          </div>
        </div>
      </div>
    </div>
  );
};
