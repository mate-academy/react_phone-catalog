import {FaX} from 'react-icons/fa6';
import {useContext} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import {ProductContext} from '../../context/ProductContext';
import {PriceList} from '../../type/PriceList';

import style from './CartList.module.scss';

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

  const amontOfProducе = priceList.reduce(
    (acc, product) => acc + product.number,
    0,
  );

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
                <div className={style.cartList__cart} key={product.id}>
                  <button
                    className={style.cartList__cart_delete}
                    type="button"
                    aria-label="delete"
                    onClick={() => handleDelete(+product.id)}
                  >
                    <FaX />
                  </button>

                  <Link
                    className={style.cartList__link}
                    to={`../${product.category}/:${product.itemId}`}
                  >
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
                  </Link>
                  <button
                    className={classNames([style.cartList__cart_reduction], {
                      [style.cartList__cart_reduction_isNotActive]:
                        product.number === 1,
                    })}
                    type="button"
                    aria-label="Decrement"
                    onClick={() => handleDecrement(+product.id)}
                    disabled={product.number === 1}
                  >
                    -
                  </button>
                  <span className={style.cartList__cart_number}>
                    {product.number}
                  </span>
                  <button
                    className={style.cartList__cart_increase}
                    type="button"
                    aria-label="Increment"
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
              >{`Total for ${amontOfProducе} items`}</span>
              <Link to="../checkout" className={style.cartList__price_button}>
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
