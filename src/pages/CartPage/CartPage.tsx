import { useContext, useState } from "react"
import { CartContext } from "../../contexts/CartContext";
import { Product } from "../../types/Product";
import { BackLink } from "../../components/BackLink";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Errors } from "../../types/Errors";
import './CartPage.scss';
import { CartItem } from "../../components/CartItem";

export const CartPage = () => {
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price, 0);
  const [showInfo, setShowInfo] = useState(false);

  const preparedCart = cart
    .sort((item1, item2) => item1.name.localeCompare(item2.name))
    .reduce((uniqueItems, currentItem) => {
      const isItemExist = uniqueItems.find(item => item.id === currentItem.id);

      if (!isItemExist) {
        uniqueItems.push(currentItem);
      }

      return uniqueItems;
    }, [] as Product[]);

  const handleShowInfo = () => {
    setShowInfo(true);

    setTimeout(() => setShowInfo(false), 3000);
  };

  return (
    <div className="cart-page">
      <div className="container">
        <BackLink />

        <h1 className="cart-page__title">Cart</h1>

        {cart.length ? (
          <div className="cart-page_block">
            <ul className="cart-page__items">
              {preparedCart.map(product => (
                <CartItem product={product} key={product.id} />
              ))}
            </ul>

            <div className="cart-page__checkout">
              <h2 className="cart-page__price">
                {`${totalPrice}`}
              </h2>

              <p className="cart-page__total-amount">
                {cart.length === 1
                  ? '1 item'
                  : `${cart.length} items`
                }
              </p>

              {!showInfo &&
                <Button onClick={handleShowInfo}>Checkout</Button>
              }

              {showInfo && (
                <p className="cart-page__info">
                  Sorry, this feature is not implemented yet!
                </p>
              )}
            </div>
          </div>
        ): (
          <ErrorMessage message={Errors.EmptyCart} />
        )}
      </div>
    </div>
  )
}
