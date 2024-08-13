import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './CartPage.scss';
import Vec_light_left from '../../images/homePage/Vec_light_left.svg';
import Cross from '../../images/cartImages/Cross.svg';
import Minus from '../../images/cartImages/Minus.svg';
import Plus from '../../images/cartImages/Plus.svg';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { actions, CardProduct, removeProduct } from '../../features/cartSlice';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cartProducts, loading } = useAppSelector(state => state.cartItems);

  const uniq = Object.values(cartProducts);

  const [totalPrice, setTotalPrice] = useState<number>();

  const countTotal = (elements: CardProduct[]) => {
    let totalPrice = 0;

    elements.map(el => {
      totalPrice += el.product.priceDiscount * el.count
    })

    return totalPrice;
  };

  useEffect(() => {
    setTotalPrice(countTotal(cartProducts))
    }, [cartProducts]
  )

  const productTotalPrice = (prod: CardProduct) => {
    return prod.count * prod.product.priceDiscount
  }

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: TabAccessPhone
  ) => {
    event.preventDefault();

    dispatch(removeProduct(prod.id));
  };

  const handlePlus = (product: TabAccessPhone) => {
    dispatch(actions.addProduct(product));
  };

  const handleMinus = (product: CardProduct) => {
    if (product.count === 1) {
      dispatch(removeProduct(product.product.id));
    } else {
      dispatch(actions.removeLastProduct(product.product));
    }
  };

  return (
    <div className="cartProduct">
      <div className="cartProduct__constrain">
        <div className="cartProduct__breadcrumbs">
          <NavLink to="/" className="cartProduct__home-link">
            <img
              src={Vec_light_left}
              alt="Vector_light_right"
              className="cartProduct__arrow-right"
            />
            <div className="cartProduct__back">Back</div>
          </NavLink>
        </div>
        <h1 className="cartProduct__header">Cart</h1>
        {uniq.length > 0 ? (
        <div className="cartProduct__box">
          <div className="cartProduct__container">
            {loading && <Loader/>}
              {uniq.map((product, index) => {
                return (
                  <div key={index} className="cartProduct__itemCard">
                    <div className="cartProduct__containerItem">
                      <div className="cartProduct__item">
                        <NavLink
                          to={`/${product.product.category}/${product.product.id}`}
                          className="cartProduct__navLink"
                        >
                          <button
                            className="cartProduct__buttonCross"
                            onClick={(event) => handleDelete(event, product.product)}
                          >
                            <img
                              src={Cross}
                              alt="Cross"
                              className="cartProduct__cross"
                            />
                          </button>
                          <div className="cartProduct__image">
                            <img
                              src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.product.images[0]}`}
                              alt={product.product.category}
                              className="cartProduct__image__link"
                            />
                          </div>
                          <div className="cartProduct__name">
                            {product.product.name}
                          </div>
                        </NavLink>
                        <div className="cartProduct__countPrice">
                          <div className="cartProduct__count">
                            <button
                              className="cartProduct__count__box"
                              onClick={() => handleMinus(product)}
                            >
                              <img
                                src={Minus}
                                alt="Minus"
                                className="cartProduct__count__num"
                              />
                            </button>
                            <div className="cartProduct__count__quantity">
                              {product.count}
                            </div>
                            <button
                              className="cartProduct__count__box"
                              onClick={() => handlePlus(product.product)}
                            >
                              <img
                                src={Plus}
                                alt="Plus"
                                className="cartProduct__count__num"
                              />
                            </button>
                          </div>
                          <div className="cartProduct__price">
                            {`$${productTotalPrice(product)}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="cartProduct__checkout">
            <div className="cartProduct__checkBlock">
              <div className="cartProduct__toPay">{`$${totalPrice}`}</div>
              <div className="cartProduct__totalItems">
                Total for three items
              </div>
            </div>
            <button className="cartProduct__payButton">Checkout</button>
          </div>
        </div>
        )
        : <div className="cartProduct__empty">Your cart is empty</div>
        }
      </div>
    </div>
  );
};
