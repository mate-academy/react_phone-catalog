import './Orders.scss';
import close from '../../images/Close.png';
import classNames from 'classnames';
import { useOrders } from '../../context/OrdersContext';
import { useProducts } from '../../context/ProductsContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Link } from 'react-router-dom';
export const Orders: React.FC = () => {
  const { orders, quantities, removeOrder, clearOrders, setQuantity } =
    useOrders();
  const { products } = useProducts();
  const orderedProducts = products.filter(product =>
    orders.includes(product.itemId),
  );

  function onChange(itemId: string, delta: number) {
    const current = quantities[itemId] ?? 1;

    setQuantity(itemId, current + delta);
  }

  function handleRemove(itemId: string) {
    removeOrder(itemId);
  }

  const totalPrice = orderedProducts.reduce((total, item) => {
    const counts = quantities[item.itemId] ?? 1;

    return total + counts * item.price;
  }, 0);

  const totalItems = orderedProducts.reduce((total, item) => {
    const counts = quantities[item.itemId] ?? 1;

    return total + counts;
  }, 0);

  function handleCheckout() {
    const shouldPay = window.confirm(
      `Pay $${totalPrice} for ${orderedProducts.length} item(s)?`,
    );

    if (shouldPay) {
      clearOrders();
      window.alert('Payment completed. Thank you for your order!');
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <Breadcrumbs />
        <h2 className="titel">Cart</h2>
        <div className="cart">
          <div className="cart__items">
            {orderedProducts.map(item => {
              const counts = quantities[item.itemId] ?? 1;
              const itemPrice = counts * item.price;

              return (
                <div key={item.id} className="Orders">
                  <div className="Orders__box box-titel">
                    <button
                      type="button"
                      className="Orders--link"
                      onClick={() => handleRemove(item.itemId)}
                    >
                      <img
                        className="Orders--link--item"
                        src={close}
                        alt="Remove item"
                      />
                    </button>
                    <img className="Orders--img" src={item.image} alt="" />
                    <Link
                      to={`/${item.category}/${item.itemId}`}
                      className="Orders__link"
                    >
                      <span className="Orders__link--name">{item.name}</span>
                    </Link>
                  </div>
                  <div className="Orders__box box-app">
                    <button
                      type="button"
                      disabled={counts === 1}
                      onClick={() => onChange(item.itemId, -1)}
                      className={classNames('Orders__box--button', {
                        isNotActive: counts === 1,
                      })}
                    >
                      -
                    </button>
                    <span className="Orders__box--item">{counts}</span>
                    <button
                      type="button"
                      disabled={counts === 10}
                      onClick={() => onChange(item.itemId, 1)}
                      className={classNames('Orders__box--button', {
                        isNotActive: counts === 10,
                      })}
                    >
                      +
                    </button>
                    <span className="Orders__box--price">${itemPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {totalPrice > 0 ? (
            <div className="result">
              <div className="result__titel">
                <h3 className="result__titel--item">
                  {'$'}
                  {totalPrice}
                </h3>
                <span className="result__titel__text">
                  Total for {totalItems} items
                </span>
              </div>
              <span className="result__line"></span>
              <button
                type="button"
                className="result__button"
                onClick={handleCheckout}
              >
                Pay ${totalPrice}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
