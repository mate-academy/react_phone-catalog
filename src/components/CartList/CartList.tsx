import {FaX} from 'react-icons/fa6';
import {useContext} from 'react';

import {ProductContext} from '../../context/ProductContext';

import style from './CartList.module.scss';
import {PriceList} from '../../type/PriceList';

export const CartList: React.FC = () => {
  const {priceList, setPriceList} = useContext(ProductContext);

  const price = () =>
    priceList.reduce(
      (acc: number, e: PriceList) => acc + e.price * e.number,
      0,
    );

  const handleIncrement = (id: number) => {
    const newPrice = priceList.map(product => {
      if (+product.id !== id) {
        return product;
      }

      return {...product, number: product.number + 1};
    });

    setPriceList(newPrice);
  };

  const handleDecrement = (id: number) => {
    const newPrice = priceList
      .map(product => {
        if (+product.id !== id) {
          return product;
        }

        if (product.number === 1) {
          return null;
        }

        return {...product, number: product.number - 1};
      })
      .filter(Boolean) as PriceList[];

    setPriceList(newPrice);
  };

  const handleDelete = (id: number) => {
    const newPrice = priceList.filter(product => +product.id !== id);

    setPriceList(newPrice);
  };

  return (
    <>
      {!priceList.length ? (
        <>
          <h1 className={style.title}>You have not selected anything</h1>
          <img className={style.img} src="img/cart-is-empty.png" alt="" />
        </>
      ) : (
        <>
          <h1 className={style.cart}>Cart</h1>
          <div className={style.cartList}>
            <div className={style.cartList__carts}>
              {priceList.map(product => (
                <div className={style.cartList__cart}>
                  <button
                    className={style.cartList__cart_delete}
                    type="button"
                    aria-label="delete"
                    onClick={() => handleDelete(+product.id)}
                  >
                    <FaX />
                  </button>

                  <div className={style.container_img}>
                    <img
                      className={style.cartList__cart_img}
                      src={product.images}
                      alt={product.id}
                    />
                  </div>

                  <span className={style.cartList__cart_title}>
                    {product.name}
                  </span>
                  <button
                    className={style.cartList__cart_reduction}
                    type="button"
                    aria-label="delete"
                    onClick={() => handleDecrement(+product.id)}
                  >
                    -
                  </button>
                  <span className={style.cartList__cart_number}>
                    {product.number}
                  </span>
                  <button
                    className={style.cartList__cart_increase}
                    type="button"
                    aria-label="delete"
                    onClick={() => handleIncrement(+product.id)}
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
              >{`Total for ${priceList.length} items`}</span>
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
