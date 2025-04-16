/* eslint-disable max-len */
import './cartPage.scss';
import sliderLeft from '../../images/homepage/arrow-left.png';
import { useCart } from '../../components/cartContext/cartContext';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { mapToProductListItem } from '../../function/mapToProductListItem';
import { ProductListItem } from '../../types/product';
import removeButton from '../../images/remove-button.png';
import plusButton from '../../images/plus-button.png';
import minusDefault from '../../images/minus-button-default.png';
import minusDisabled from '../../images/minus-button-disabled.png';
import { useNavigate } from 'react-router-dom';
import cartEmpty from '../../../public/img/cart-is-empty.png';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const allProducts: ProductListItem[] = [
    ...phones.map((p, i) =>
      mapToProductListItem({ ...p, category: 'phones' }, i),
    ),
    ...tablets.map((p, i) =>
      mapToProductListItem({ ...p, category: 'tablets' }, i + phones.length),
    ),
    ...accessories.map((p, i) =>
      mapToProductListItem(
        { ...p, category: 'accessories' },
        i + phones.length + tablets.length,
      ),
    ),
  ];

  const cartProducts = allProducts
    .filter(product => cart.some(item => item.itemId === product.itemId))
    .map(product => {
      const cartItem = cart.find(item => item.itemId === product.itemId)!;

      return { ...product, quantity: cartItem.quantity };
    });

  const total = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="cartPage">
        <div className="cartPage__top">
          <img
            src={sliderLeft}
            alt="Seta"
            className="cartPage__top--sliderLeft"
          />
          <p
            className="cartPage__top--name"
            onClick={handleBack}
            style={{ cursor: 'pointer' }}
          >
            Back
          </p>
        </div>
        <div className="cartPage__title">
          <h1 className="h1">Cart</h1>
        </div>
      </div>
      {cartProducts.length > 0 ? (
        <div className="cartPage__main">
          {cartProducts.map(product => (
            <div className="card" key={product.itemId}>
              <div className="card__details">
                <img
                  className="card__details--remove"
                  src={removeButton}
                  alt="removeButton"
                  onClick={() => removeFromCart(product.itemId)}
                />
                <div className="card__details--box">
                  <img
                    className="card__details--box--img"
                    src={`../../${product.image}`}
                    alt="Image Product"
                  />
                </div>
                <p className="card__details--name">{product.name}</p>
              </div>
              <div className="card__amount">
                <div className="card__amount--box">
                  <div
                    className={
                      product.quantity > 1
                        ? 'card__amount--box--minus--active card__amount--box--minus'
                        : 'card__amount--box--minus'
                    }
                    onClick={() => decreaseQuantity(product.itemId)}
                  >
                    <img
                      src={product.quantity > 1 ? minusDefault : minusDisabled}
                      alt="Minus"
                      className="card__amount--box--img"
                    />
                  </div>
                  <p className="card__amount--box--number">
                    {product.quantity}
                  </p>
                  <div
                    className="card__amount--box--plus"
                    onClick={() => increaseQuantity(product.itemId)}
                  >
                    <img
                      src={plusButton}
                      alt="Plus"
                      className="card__amount--box--img"
                    />
                  </div>
                </div>
                <div className="card__amount--price">
                  <p className="card__amount--price--value">
                    ${product.price * product.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cartPage__noFound">
          <img className="cartPage__img" src={cartEmpty} alt="no item" />
          <div className="cartPage__text">
            <p className="h1">No Items Yet</p>
            <p className="h4">
              When you find an item you like, click Add to Cart to see it here.
            </p>
          </div>
        </div>
      )}
      {cartProducts.length > 0 ? (
        <div className="cartPage__checkout">
          <div className="cartPage__checkout--value">
            <p className="cartPage__checkout--price">${total}</p>
            <p className="cartPage__checkout--item">
              Total for {cartProducts.length} items
            </p>
          </div>
          <button
            className="cartPage__checkout--button"
            onClick={() => {
              const confirmed = window.confirm(
                'Checkout is not implemented yet. Do you want to clear the Cart?',
              );

              if (confirmed) {
                clearCart();
              }
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        ' '
      )}
    </div>
  );
};
