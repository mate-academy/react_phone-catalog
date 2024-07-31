import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './CartPage.scss';
import Vec_light_left from '../../images/homePage/Vec_light_left.svg';
import Cross from '../../images/cartImages/Cross.svg';
import Minus from '../../images/cartImages/Minus.svg';
import Plus from '../../images/cartImages/Plus.svg';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { actions } from '../../features/cartSlice';
import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../features/productssSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector(state => state.cartItems);
  const [error, setError] = useState<string>('');
  const [prod, setProd] = useState<Record<string, number>>({});
  const { phones, tablets, accessories } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    const res = cartProducts.reduce<Record<string, number>>((acc, {id}) => {
  
      if (!acc[id]) {
        acc[id] = 0;
      }
  
      acc[id] +=1;
  
      return acc;
    }, {})

    setProd(res)

  }, [cartProducts])

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const allProducts: TabAccessPhone[] = phones.concat(tablets, accessories);

  const prodKeys = Object.keys(prod);

  function findProducts(allProducts: TabAccessPhone[], prodKeys: string | any[]) {
    let result = [];

    for (let i = 0; i < prodKeys.length; i++) {
      const x = allProducts.find((good: TabAccessPhone) => good.id === prodKeys[i])

      if (x) {
        result.push(x)
      }
    }

    return result;
  }

  useEffect(() => {
    findProducts(allProducts, prodKeys)
  }, [allProducts, prodKeys])

  const uniq = findProducts(allProducts, prodKeys);

  const handleDelete = (
    prod: TabAccessPhone,
  ) => {
    dispatch(actions.removeProduct(prod));
  };

  const countProduct = (product: TabAccessPhone) => {
    return prod[product.id];
  };

  const handlePlus = (product: TabAccessPhone) => {
    dispatch(actions.addProduct(product));
  };

  const handleMinus = (product: TabAccessPhone) => {
    const toRemoveOne = prodKeys.find(el => el === product.id);
    const toRemoveCount = cartProducts.filter(el => el.id === product.id).length;

    if (toRemoveCount === 1) {
      handleDelete(product);
    } else if (toRemoveOne) {
      setProd(prev => {
        prev[toRemoveOne] -= 1;
        return prev;
      })
      countProduct(product)
    }
  };

  console.log(prod)

  useEffect(() => {
    if (cartProducts.length === 0) {
      setError('There are no products in the cart yet');
    }
  }, [cartProducts]);

  return !error ? (
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
        <div className="cartProduct__box">
          <div className="cartProduct__container">
            {uniq &&
              uniq.map((product: TabAccessPhone, index) => {
                return (
                  <div key={index} className="cartProduct__itemCard">
                    <div className="cartProduct__containerItem">
                      <div className="cartProduct__item">
                        <NavLink
                          to={`/${product.category}/${product.id}`}
                          className="cartProduct__navLink"
                        >
                          <button
                            className="cartProduct__buttonCross"
                            onClick={() => handleDelete(product)}
                          >
                            <img
                              src={Cross}
                              alt="Cross"
                              className="cartProduct__cross"
                            />
                          </button>
                          <div className="cartProduct__image">
                            <img
                              src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.images[0]}`}
                              alt={product.category}
                              className="cartProduct__image__link"
                            />
                          </div>
                          <div className="cartProduct__name">
                            {product.name}
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
                              {countProduct(product)}
                            </div>
                            <button
                              className="cartProduct__count__box"
                              onClick={() => handlePlus(product)}
                            >
                              <img
                                src={Plus}
                                alt="Plus"
                                className="cartProduct__count__num"
                              />
                            </button>
                          </div>
                          <div className="cartProduct__price">
                            {`$${product.priceDiscount}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cartProduct__checkout">
            <div className="cartProduct__checkBlock">
              <div className="cartProduct__toPay">{`$${1234}`}</div>
              <div className="cartProduct__totalItems">
                Total for three items
              </div>
            </div>
            <button className="cartProduct__payButton">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>{error}</div>
  );
};
