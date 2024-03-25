import { FaX } from 'react-icons/fa6';
import { useContext, useEffect, useState } from 'react';

import { Products } from '../../type/Productes';
import { getProducts } from '../../api';
import { ProductContext } from '../../context/ProductContext';

import style from './CartList.module.scss';

export const CartList: React.FC = () => {
  const [visibleProduct, setVisibleProduct] = useState<Products[]>([]);
  const { priceList, setPriceList } = useContext(ProductContext);

  useEffect(() => {
    getProducts().then(data => {
      let newVisibleProduct: Products[] = [];

      priceList.forEach(e => {
        const filteredData = data.filter(d => d.id === e.id);

        newVisibleProduct = newVisibleProduct.concat(filteredData);
      });
      setVisibleProduct(newVisibleProduct);
    });
  }, [priceList]);

  const price = () =>
    visibleProduct.reduce((acc: number, e: Products) => acc + e.price, 0);

  return (
    <>
      {!visibleProduct.length ? (
        <>
          <h1 className={style.title}>You have not selected anything</h1>
          <img className={style.img} src="img/cart-is-empty.png" alt="" />
        </>
      ) : (
        <>
          <h1 className={style.cart}>Cart</h1>
          <div className={style.cartList}>
            <div className={style.cartList__carts}>
              {visibleProduct.map(product => (
                <div className={style.cartList__cart}>
                  <button
                    className={style.cartList__cart_delete}
                    type="button"
                    aria-label="delete"
                  >
                    <FaX />
                  </button>

                  <img
                    className={style.cartList__cart_img}
                    src={product.image}
                    alt={product.itemId}
                  />

                  <span className={style.cartList__cart_title}>
                    {product.name}
                  </span>
                  <button
                    className={style.cartList__cart_reduction}
                    type="button"
                    aria-label="delete"
                  >
                    -
                  </button>
                  <span className={style.cartList__cart_number}>5</span>
                  <button
                    className={style.cartList__cart_increase}
                    type="button"
                    aria-label="delete"
                  >
                    +
                  </button>
                  <span
                    className={style.cartList__cart_price}
                  >{`$ ${product.price}`}</span>
                </div>
              ))}
            </div>
            <div className={style.cartList__price}>
              <h1 className={style.cartList__price_title}>{`$ ${price()}`}</h1>
              <span
                className={style.cartList__price_about}
              >{`Total for ${visibleProduct.length} items`}</span>
              <button
                className={style.cartList__price_button}
                type="button"
                onClick={() => setPriceList([])}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
