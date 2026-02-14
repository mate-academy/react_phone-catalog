import './MobileViewCart.scss';
import { Product } from '../../types/Product';
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  onRemove: (id: string) => void;
};

export const MobileViewCart: React.FC<Props> = ({ product, onRemove }) => {
  const { toggleCart, updateCounter, cart } = useCart();

  const counter = cart.find(
    cartProduct => cartProduct.item.itemId === product.itemId,
  );

  const DeleteProduct = () => {
    toggleCart(product);
    onRemove(product.itemId);
  };

  return (
    <>
      <div className="mobile-view-cart">
        <div className="mobile-view-cart__desc-wrapper">
          <img
            className="mobile-view-cart__close"
            src="img/ui-kit/Close-dark.png"
            alt="close"
            onClick={() => {
              DeleteProduct();
            }}
          />

          <Link to={`/${product.category}/${product.itemId}`}>
            <img
              className="mobile-view-cart__photo"
              src={product.image}
              alt="product-photo"
            />
          </Link>

          <Link
            to={`/${product.category}/${product.itemId}`}
            className="mobile-view-cart__title"
          >
            {product.name}
          </Link>
        </div>

        <div className="mobile-view-cart__buttons-wrapper">
          <div className="mobile-view-cart__buttons">
            <img
              className="mobile-view-cart__button"
              src="img/ui-kit/cart-button-minus.png"
              alt="-"
              onClick={() => {
                if (counter?.count === 1) {
                  DeleteProduct();
                }

                updateCounter(product.itemId, 'decrement');
              }}
            />

            <p className="mobile-view-cart__counter">{counter?.count}</p>

            <img
              className="mobile-view-cart__button"
              src="img/ui-kit/cart-button-plus.png"
              alt="+"
              onClick={() => {
                updateCounter(product.itemId, 'add');
              }}
            />
          </div>

          <div className="mobile-view-cart__price">
            ${counter ? product.price * counter.count : 0}
          </div>
        </div>
      </div>
    </>
  );
};
