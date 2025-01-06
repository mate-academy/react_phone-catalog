import style from './CartPage.module.scss';
import { CartItem } from './CartItem';
import { Product } from '../../types/Product';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { getProducts } from '../../utils/getProducts';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../components/GlobalProvider';

export const CartPage = () => {
  const navigate = useNavigate();
  const { inCart: products } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const [checkOutActive, setCheckoutActive] = useState(false);

  useEffect(() => {
    const uniqueArr: Product[] = [];

    for (let i = 0; i < products.length; i++) {
      const prod = products[i];

      if (uniqueArr.every(uprod => prod.itemId !== uprod.itemId)) {
        uniqueArr.push(prod);
      }
    }

    setUniqueProducts(() => [...uniqueArr].sort((a, b) => b.price - a.price));
  }, [products]);

  const countProducts = (itemId: string) =>
    products.filter((prod: Product) => itemId === prod.itemId).length;

  const handleCountIncrease = (id: string) => {
    const newProd = getProducts.getProductById(products, id);

    if (newProd) {
      dispatch({ type: 'setInCart', payload: [...products, newProd] });
    } else {
      dispatch({ type: 'setInCart', payload: [...products] });
    }
  };

  const handleCountDecrease = (id: string) => {
    if (countProducts(id) - 1 > 0) {
      const delIndex = products.findIndex(prod => prod.itemId === id);
      const newArr = [...products];

      newArr.splice(delIndex, 1);
      dispatch({ type: 'setInCart', payload: newArr });
    }
  };

  const handleClearItem = (id: string) => {
    const clearedProds = products.filter(prod => prod.itemId !== id);

    dispatch({ type: 'setInCart', payload: clearedProds });
  };

  const getTotalProce = () => {
    return products.reduce((acc, cur) => acc + cur.price, 0);
  };

  const clearCart = () => dispatch({ type: 'setInCart', payload: [] });

  return (
    <div className={style.cart_container}>
      <div className={style.container_nav}>
        <div className={classNames(style.icon_container)}>
          <div className={classNames(style.icon, style.icon_left)} />
        </div>

        <p onClick={() => navigate(-1)}>Back</p>
      </div>

      {products.length > 0 ? (
        <div className={style.container_body}>
          <div className={style.container_title}>
            <h1 className={style.title}>Cart</h1>
          </div>
          <div className={style.container_main}>
            <div className={style.container_cartItems}>
              {uniqueProducts.map(prod => {
                return (
                  <CartItem
                    key={uuidv4()}
                    product={prod}
                    count={countProducts(prod.itemId)}
                    onIncrease={handleCountIncrease}
                    onDecrease={handleCountDecrease}
                    onClear={handleClearItem}
                  />
                );
              })}
            </div>

            <div className={style.container_summary}>
              <div className={style.container_priceTotal}>
                <h2>${getTotalProce()}</h2>

                <p
                  className={style.container_count}
                >{`Total for ${products.length === 1 ? `${products.length} item` : `${products.length} items`}`}</p>
              </div>

              <div className={style.seperator} />

              <div
                className={classNames(
                  style.container_checkout,
                  'buttons_container',
                  {
                    buttons_container_selected: checkOutActive,
                  },
                )}
                onClick={() => setCheckoutActive(true)}
              >
                <div
                  className={classNames('buttons_text', {
                    buttons_text_selected: checkOutActive,
                  })}
                >
                  Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.container_noproducts}>
          <h3>Your Cart is Empty</h3>
          <img
            src="\img\cart-is-empty.png"
            alt=""
            className={style.empty_image}
          />
        </div>
      )}

      {checkOutActive && (
        <div className={style.modal_container}>
          <div className={style.modal}>
            <h2>Checkout is not implemented yet.</h2>

            <p className={style.description}>Do you want to clear the Cart?</p>

            <div className={style.modal_buttons}>
              <div
                className={classNames(style.modal_bt, 'buttons_container')}
                onClick={() => {
                  clearCart();
                  setCheckoutActive(false);
                }}
              >
                <div className={classNames('buttons_text')}>Clear</div>
              </div>

              <div
                className={classNames(style.modal_bt, 'buttons_container')}
                onClick={() => setCheckoutActive(() => false)}
              >
                <div className={classNames('buttons_text')}>Cancel</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
