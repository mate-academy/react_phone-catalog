import style from './CartPage.module.scss';
import { accessLocalStorage } from '../../utils/accessLocalStorage';
import { LocalAccessKeys } from '../../utils/LocalAccessKeys';
import { CartItem } from './CartItem';
import { Product } from '../../types/Product';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/getProducts';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(
    accessLocalStorage.get(LocalAccessKeys.cart),
  );
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

  function countProducts(itemId: string) {
    const data = accessLocalStorage.get(LocalAccessKeys.cart);

    return data.filter((prod: Product) => itemId === prod.itemId).length;
  }

  const handleCountIncrease = (id: string) => {
    setProducts(prev => {
      const newProd = getProducts.getProductById(products, id);

      if (newProd) {
        accessLocalStorage.append(newProd, LocalAccessKeys.cart);

        return [...prev, newProd];
      }

      return prev;
    });
  };

  const handleCountDecrease = (id: string) => {
    if (countProducts(id) - 1 > 0) {
      setProducts(prev => {
        const delIndex = prev.findIndex(prod => prod.itemId === id);
        const newArr = [...prev];

        newArr.splice(delIndex, 1);
        accessLocalStorage.set(newArr, LocalAccessKeys.cart);

        return newArr;
      });
    }
  };

  const handleClearItem = (id: string) => {
    const clearedProds = products.filter(prod => prod.itemId !== id);

    setProducts(() => clearedProds);

    accessLocalStorage.set(clearedProds, LocalAccessKeys.cart);
  };

  const getTotalProce = () => {
    return products.reduce((acc, cur) => acc + cur.price, 0);
  };

  const clearCart = () => {
    setProducts([]);
    accessLocalStorage.clearKey(LocalAccessKeys.cart);
  };

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
