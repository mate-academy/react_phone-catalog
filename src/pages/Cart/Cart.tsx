import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { Phone } from '../../types/Phone';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import { CartItemList } from '../../Components/CartItemList/CartItemList';
import { CheckOut } from '../../Components/CheckOut/CheckOut';
import './Cart.scss';

export const Cart = () => {
  const { inCart } = useContext(usersChoiceContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    let price = 0;
    let products = 0;

    inCart.forEach(el => {
      products += el.number;
      price += (el.price - el.discount) * el.number;
    });
    setTotalPrice(price);
    setNumberOfProducts(products);
  }, [inCart]);

  return (
    <div className="Cart">
      <div className="Cart__wrapper">
        <Link to="/" className="Cart__Link">
          <img src="./assets/Chevron-arrow-left.svg" alt="arrow_left" />
          <h3 className="Cart__linkText">
            Back
          </h3>
        </Link>
        <h1 className="Cart__tilte">Cart</h1>
        <div className="Cart__Content">
          {
            inCart.length > 0 ? (
              <>
                <div className="Cart__Left">
                  <CartItemList inCart={inCart} />
                </div>
                <div className="Cart__Rigth">
                  <CheckOut
                    totalPrice={totalPrice}
                    numberOfProducts={numberOfProducts}
                  />
                </div>
              </>
            ) : (
              <div className="Cart__empty">
                <h2 className="Cart__emptyText">Your cart is empty</h2>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
