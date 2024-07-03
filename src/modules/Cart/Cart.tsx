import { useContext, useEffect, useMemo, useState } from 'react';
import './Cart.scss';
import { ProductContext } from '../shared/Context/Context';
import { Back } from '../shared/Back/Back';
import { CheckoutModal } from '../shared/CheckoutModal/CheckoutModal';

type CartItem = {
  quantity: number;
  price: number;
  id: number;
};

export const Cart = () => {
  const { cart, setLocalCart } = useContext(ProductContext);
  const [totalCart, setTotalCart] = useState<CartItem[] | []>([]);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const newTotalCart: CartItem[] = cart.map(product => ({
      quantity: 1,
      price: product.price,
      id: product.id,
    }));

    setTotalCart(newTotalCart);
  }, [cart]);

  const totalSums = useMemo(() => {
    const sum = [0, 0];

    totalCart.forEach(product => {
      sum[0] += product.quantity;
      sum[1] += product.price * product.quantity;
    });

    return sum;
  }, [totalCart]);

  const handleMinus = (id: number) => {
    setTotalCart(currentTotalCart => {
      const newTotalCart = currentTotalCart.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }

        return product;
      });

      return newTotalCart;
    });
  };

  const handlePlus = (id: number) => {
    setTotalCart(currentTotalCart => {
      const newTotalCart = currentTotalCart.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      });

      return newTotalCart;
    });
  };

  const handleDelete = (id: number) => {
    setLocalCart(currentLocalCart => {
      return currentLocalCart.filter(product => product.id !== id);
    });
  };

  return (
    <main className="main">
      <div className="container">
        {!isModal ? (
          <div className="cart">
            <Back />
            <h1 className="page-title cart__title">Cart</h1>
            {cart.length > 0 ? (
              <>
                <div className="cart__cards">
                  {cart.map(good => {
                    const { id, image, name, price } = good;
                    const currentGood = totalCart.find(item => item.id === id);

                    return (
                      <article className="cart__card" key={id}>
                        <div className="cart__card--left">
                          <button
                            className="cart__close"
                            onClick={() => handleDelete(id)}
                          ></button>
                          <img src={image} alt="good" className="cart__image" />
                          <h4 className="cart__name">{name}</h4>
                        </div>
                        <div className="cart__card--right">
                          <div className="cart__buttons">
                            <button
                              className="cart__button cart__button--minus"
                              onClick={() => handleMinus(id)}
                              disabled={currentGood?.quantity === 1}
                            ></button>
                            <div className="cart__number">
                              {currentGood?.quantity}
                            </div>
                            <button
                              className="cart__button cart__button--plus"
                              onClick={() => handlePlus(id)}
                            ></button>
                          </div>
                          <p className="cart__price">${price}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="cart__total">
                  <div className="cart__sum">${totalSums[1]}</div>
                  <div className="cart__total-number">
                    {`Total for ${totalSums[0]} ${totalSums[0] === 1 ? `item` : `items`}`}
                  </div>
                  <button
                    className="cart__checkout"
                    onClick={() => setIsModal(true)}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <h1 className="title-error cart__error">Your cart is empty</h1>
            )}
          </div>
        ) : (
          <CheckoutModal setIsModal={setIsModal} />
        )}
      </div>
    </main>
  );
};
