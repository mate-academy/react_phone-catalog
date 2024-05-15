import { useContext, useState } from 'react';
import './BasketPage.scss';
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { ProductBasket } from '../../types/Product';

export const BasketPage = () => {
  const { pathname } = useLocation();
  const { basketProducts, setBasketProducts } = useContext(StoreContext);

  const [isModalVisible, setIsMobileVisible] = useState(false);

  const handleDeleteFromBasket = (productId: string) => {
    const newProducts = basketProducts.filter(bp => bp.itemId !== productId);

    setBasketProducts(newProducts);
  };

  const handleDecreaseAmount = (product: ProductBasket) => {
    if (product.amount === 1) {
      handleDeleteFromBasket(product.itemId);

      return;
    }

    const newProducts = basketProducts.map(p => {
      if (product.itemId === p.itemId) {
        return { ...p, amount: p.amount - 1 };
      } else {
        return p;
      }
    });

    setBasketProducts(newProducts);
  };

  const handleIncreaseAmount = (productId: string) => {
    const newProducts = basketProducts.map(product => {
      if (product.itemId === productId) {
        return { ...product, amount: product.amount + 1 };
      } else {
        return product;
      }
    });

    setBasketProducts(newProducts);
  };

  const totalPrice = () => {
    const result = basketProducts.reduce((acc, product) => {
      return acc + product.price * product.amount;
    }, 0);

    return result;
  };

  const totalItems = () => {
    const result = basketProducts.reduce((acc, product) => {
      return acc + product.amount;
    }, 0);

    return result;
  };

  return (
    <div className="basket-page">
      <div className="history-path">
        <Link to="/">
          <div className="history-path__icon history-path__icon--home" />
        </Link>
        <div className="history-path__icon history-path__icon--arrow" />
        <Link to="basket" className="history-path__page-name">
          Basket
        </Link>
      </div>

      <h1 className="basket-title">Basket</h1>

      {!!!basketProducts.length ? (
        <div className="basket-page--is-empty" />
      ) : (
        <div className="basket">
          <div className="basket__products">
            {basketProducts.map(product => (
              <div className="basket__product" key={product.itemId}>
                <div className="product__main-info">
                  <div
                    className="main-info__button-delete"
                    onClick={() => handleDeleteFromBasket(product.itemId)}
                  />
                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    state={{ pathname }}
                    className="main-info__link"
                  >
                    <div className="main-info__card-image">
                      <img className="card-image" src={product.image} />
                    </div>
                    <div className="main-info__product-title">
                      {product.name}
                    </div>
                  </Link>
                </div>

                <div className="product__order-info">
                  <div className="order-info__amount">
                    <button
                      className="amount__button amount__button--decrease"
                      onClick={() => handleDecreaseAmount(product)}
                    />
                    <div className="amount__value">{product.amount}</div>
                    <button
                      className="amount__button amount__button--increase"
                      onClick={() => handleIncreaseAmount(product.itemId)}
                    />
                  </div>

                  <div className="order-info__price">{`$${product.price * product.amount}`}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="basket__total-order">
            <div className="total-order__price">
              <div className="price__value">{totalPrice()}</div>
              <div className="price__discription">{`Total for ${totalItems()} items`}</div>
            </div>
            <button
              className="total-order__button-buy"
              onClick={() => setIsMobileVisible(true)}
            >
              Buy
            </button>
          </div>
        </div>
      )}

      <div
        className="modal"
        style={{ display: isModalVisible ? 'flex' : 'none' }}
      >
        <div className="modal__modal-content">
          <div className="modal-content__button-close-container">
            <div
              className="modal-content__button-close"
              onClick={() => setIsMobileVisible(false)}
            />
          </div>
          <div className="modal-content__message">
            Thank you for choosing our store. <br />
            Unfortunately, purchase is not yet available.
          </div>

          <div className="modal-content__button-container">
            <button className="modal-content__button">Clear Basket</button>
          </div>
        </div>
      </div>
    </div>
  );
};
