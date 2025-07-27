import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { CartItemCard } from '../../Components/CartItemCard';
import { LinkBack } from '../../Components/LinkBack';
console.log('SCSS importing...');
import './CartPage.scss';
import type { Product } from '../../types/products';
import { useThemeState } from '../../stateManagers/themeState';
import { useTranslationState } from '../../stateManagers/languageState';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { productInCart, setProductInCart, setCount } = useContext(CartContext);
  const { translate } = useTranslationState();
  const { theme } = useThemeState();
  const navigate = useNavigate();

  function deleteProductFromCart(product: Product) {
    setProductInCart(product);
  }

  function addCount(product: Product) {
    setCount(product, 'add');
  }

  function subCount(product: Product) {
    setCount(product, 'sub');
  }

  const totalPrice = productInCart.reduce(
    (prev, product) => prev + product.price * product.quantity,
    0,
  );

  const productInCartLength = productInCart.reduce(
    (prev, product) => prev + product.quantity,
    0,
  );

  const isVisibleCheckout = productInCart.length > 0;

  const stringItem = productInCartLength > 1 ? `items` : `item`;

  return (
    <section className="cart">
      <div className="cart__text">
        <LinkBack />

        <h1 className="cart__title">{translate('Cart')}</h1>
      </div>

      <div className="cart__down-part">
        <div className="cart__product">
          {productInCart.map((product) => (
            <CartItemCard
              key={product.id}
              product={product}
              onDelete={() => deleteProductFromCart(product)}
              addCount={() => addCount(product)}
              subCount={() => subCount(product)}
            />
          ))}
        </div>

        {isVisibleCheckout && (
          <div className={`cart__checkout cart__checkout--${theme}`}>
            <div>
              <h2>${totalPrice}</h2>
              <span>
                {translate('Total for')} {productInCartLength}{' '}
                {translate(`${stringItem}`)}
              </span>
            </div>
            <hr className="border" />
            <button
              className={`check-button check-button--${theme}`}
              onClick={() => navigate('/make-your-choice')}
            >
              {translate('Checkout')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
