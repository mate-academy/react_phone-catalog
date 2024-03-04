import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './CartPage.scss';
import { CartContext } from '../../components/CartContext/CartContext';
import { BASE_URL } from '../../api';
import { OrderedProduct } from '../../type/OrderedProduct';
import { Message } from '../../type/Message';
import { Product } from '../../type/Product';

export const CartPage = () => {
  const { orderedProducts, setOrderedProducts, products, setMessage } =
    useContext(CartContext);

  const handleIncreaseQuantity = (currentProduct: OrderedProduct) => {
    setOrderedProducts(items =>
      items.map(item =>
        item.product === currentProduct.product
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecreaseQuantity = (currentProduct: OrderedProduct) => {
    setOrderedProducts(items =>
      items.map(item =>
        item.product === currentProduct.product && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const getProduct = (goods: Product[], orderedGoods: OrderedProduct) =>
    goods.find(item => item.name === orderedGoods.product);

  const getTotalPrice = (goods: Product[], orderedGoods: OrderedProduct[]) =>
    orderedGoods.reduce(
      (sum, item) =>
        sum + item.quantity * (getProduct(goods, item)?.price || 0),
      0,
    );

  const getNumberProducts = (orderedGoods: OrderedProduct[]) =>
    orderedGoods.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="container">
      <div className="cart-page">
        <section className="page__section">
          <Breadcrumbs />
        </section>

        <section className="page__section">
          <h1 className="page__title">Cart</h1>
        </section>

        <section className="cart-page__section page__section">
          {orderedProducts.length > 0 ? (
            <div className="cart-page__grid">
              <ul className="cart-page__list-products">
                {orderedProducts.map(orderedProduct => (
                  <li className="cart-page__product" key={orderedProduct.id}>
                    <div className="cart-page__container-info">
                      <button
                        aria-label="Delete button"
                        type="button"
                        className="cart-page__button-close"
                        data-cy="cartDeleteButton"
                        onClick={() =>
                          setOrderedProducts(items =>
                            items.filter(
                              item => item.product !== orderedProduct.product,
                            ),
                          )
                        }
                      >
                        <span className="icon icon--close" />
                      </button>
                      <div className="cart-page__image-container">
                        <img
                          className="product-card__image"
                          src={
                            BASE_URL +
                            getProduct(products, orderedProduct)?.image
                          }
                          alt={orderedProduct.product}
                        />
                      </div>
                      <Link
                        to={`../../${getProduct(products, orderedProduct)?.category}/${getProduct(products, orderedProduct)?.phoneId}`}
                        className="cart-page__link"
                      >
                        <p className="cart-page__name">
                          {orderedProduct.product}
                        </p>
                      </Link>
                    </div>

                    <div className="cart-page__container-second">
                      <div className="cart-page__counter-container">
                        <button
                          aria-label="Reduce quantity"
                          type="button"
                          className="cart-page__counter-button"
                          onClick={() => handleDecreaseQuantity(orderedProduct)}
                        >
                          <span
                            className={cn('icon', {
                              'icon--minus': orderedProduct.quantity === 0,
                              'icon--minus-chevron':
                                orderedProduct.quantity !== 0,
                            })}
                          />
                        </button>
                        <p className="cart-page__quantity">
                          {orderedProduct.quantity}
                        </p>
                        <button
                          aria-label="Increase quantity"
                          type="button"
                          className="cart-page__counter-button"
                          onClick={() => handleIncreaseQuantity(orderedProduct)}
                        >
                          <span className="icon icon--plus" />
                        </button>
                      </div>
                      <h2 className="cart-page__price">
                        {`$${(getProduct(products, orderedProduct)?.price || 0) * orderedProduct.quantity}`}
                      </h2>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-page__total">
                <h1 className="cart-page__total-price">
                  {`$${getTotalPrice(products, orderedProducts)}`}
                </h1>
                <p className="cart-page__number-items">
                  {`Total for ${getNumberProducts(orderedProducts)} items`}
                </p>
                <button
                  type="button"
                  className="cart-page__button"
                  onClick={() => setMessage(Message.NotImplemented)}
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div>Your cart is empty</div>
          )}
        </section>
      </div>
    </div>
  );
};
