import { BackButton } from '../../components/BackButton';
import './Cart.scss';

export const Cart = () => {
  return (
    <div className="cart">
      <BackButton />

      <h1 className="cart__title">Cart</h1>

      <div className="cart__container">
        <div className="cart__products">
          <div className="cart__product">
            <div className="cart__product-group">
              <img
                src="/icons/close.svg"
                alt="Close icon"
                className="cart__product-close"
              />

              <div className="cart__product-image-container square-container">
                <img
                  src="/img/phones/apple-iphone-14/midnight/00.webp"
                  alt="Iphone 14 photo"
                  className="cart__product-image"
                />
              </div>

              <p className="cart__product-name body-text slim-text">
                Apple iPhone 14 Pro 128GB Silver (MQ023)
              </p>
            </div>

            <div className="cart__product-group">
              <div className="cart__product-quantity">
                <button className="cart__product-quantity-button button--white">
                  <img src="/icons/minus.svg" alt="Minus icon" />
                </button>

                <p className="body-text">1</p>

                <button className="cart__product-quantity-button button--white">
                  <img src="/icons/plus.svg" alt="Plus icon" />
                </button>
              </div>

              <h3 className="cart__product-price">$999</h3>
            </div>
          </div>

          <div className="cart__product">
            <div className="cart__product-group">
              <img
                src="/icons/close.svg"
                alt="Close icon"
                className="cart__product-close"
              />

              <div className="cart__product-image-container square-container">
                <img
                  src="/img/phones/apple-iphone-14/midnight/00.webp"
                  alt="Iphone 14 photo"
                  className="cart__product-image"
                />
              </div>

              <p className="cart__product-name body-text slim-text">
                Apple iPhone 14 Pro 128GB Silver (MQ023)
              </p>
            </div>

            <div className="cart__product-group">
              <div className="cart__product-quantity">
                <button className="cart__product-quantity-button button--white">
                  <img src="/icons/minus.svg" alt="Minus icon" />
                </button>

                <p className="body-text">1</p>

                <button className="cart__product-quantity-button button--white">
                  <img src="/icons/plus.svg" alt="Plus icon" />
                </button>
              </div>

              <h3 className="cart__product-price">$999</h3>
            </div>
          </div>

          <div className="cart__product">
            <div className="cart__product-group">
              <img
                src="/icons/close.svg"
                alt="Close icon"
                className="cart__product-close"
              />

              <div className="cart__product-image-container square-container">
                <img
                  src="/img/phones/apple-iphone-14/midnight/00.webp"
                  alt="Iphone 14 photo"
                  className="cart__product-image"
                />
              </div>

              <p className="cart__product-name body-text slim-text">
                Apple iPhone 14 Pro 128GB Silver (MQ023)
              </p>
            </div>

            <div className="cart__product-group">
              <div className="cart__product-quantity">
                <button className="cart__product-quantity-button button--white">
                  <img src="/icons/minus.svg" alt="Minus icon" />
                </button>

                <p className="body-text">1</p>

                <button className="cart__product-quantity-button button--white">
                  <img src="/icons/plus.svg" alt="Plus icon" />
                </button>
              </div>

              <h3 className="cart__product-price">$999</h3>
            </div>
          </div>
        </div>

        <div className="cart__summary">
          <h2 className="cart__summary-amount h2--desktop">$2657</h2>
          <p className="cart__summary-items body-text">Total for 3 items</p>

          <div className="divider-line"></div>

          <button className="cart__summary-button">Checkout</button>
        </div>
      </div>
    </div>
  );
};
