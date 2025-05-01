import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/GlobalProvider';
import { BackPath } from '../BackPath/BackPath';
import { Link } from 'react-router-dom';
import { useLoader } from '../../utils/useLoader';
import { Loader } from '../Loader/Loader';

export const Shopping = () => {
  const { cart, calculateTotalItems } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loading = useLoader();

  const handleRemove = (id: string) => {
    dispatch({
      type: 'removeItem',
      itemType: 'cart',
      payload: id,
    });
  };

  const handleIncrement = (id: string) => {
    const updatedCart = cart.map(item =>
      item.itemId === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item,
    );

    dispatch({ type: 'loadList', itemType: 'cart', payload: updatedCart });
  };

  const handleDecrement = (id: string) => {
    const updatedCart = cart.map(item =>
      item.itemId === id
        ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 1) }
        : item,
    );

    dispatch({ type: 'loadList', itemType: 'cart', payload: updatedCart });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    dispatch({ type: 'loadList', itemType: 'cart', payload: [] });
  };

  const handleCheckout = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <BackPath />
      <section className="shopping">
        <h1 className="shopping__title">Cart</h1>
        {loading ? (
          <Loader />
        ) : cart.length > 0 ? (
          <div className="shopping__desktop">
            <div className="shopping__cards">
              {cart.map(car => (
                <div className="shopping__card" key={car.id}>
                  <div className="shopping__box-1">
                    <button
                      className="shopping__delete"
                      onClick={() => handleRemove(car.itemId)}
                    >
                      <img src="img/icons/delete-card.svg" alt="close" />
                    </button>

                    <Link to={`/${car.category}/${car.itemId}`}>
                      <img
                        className="shopping__img"
                        src={car.image}
                        alt="product"
                      />
                    </Link>
                    <p className="shopping__name">{car.name}</p>
                  </div>
                  <div className="shopping__box-2">
                    <div className="shopping__buttons">
                      <button
                        className="shopping__button"
                        disabled={(car.quantity ?? 1) <= 1}
                        onClick={() => handleDecrement(car.itemId)}
                      >
                        <img src="img/icons/minus.svg" alt="minus" />
                      </button>
                      {car.quantity || 1}
                      <button className="shopping__button">
                        <img
                          src="img/icons/plus.svg"
                          alt="plus"
                          onClick={() => handleIncrement(car.itemId)}
                        />
                      </button>
                    </div>
                    <h3 className="shopping__price">{`$${car.quantity ? car.quantity * car.price : car.price}`}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="shopping__checkout-box">
              <div className="shopping__total">
                <h2 className="shopping__total-price">{`$${totalPrice}`}</h2>
                <p className="shopping__quantity">{`Total for ${calculateTotalItems()} item${calculateTotalItems() === 1 ? '' : 's'}`}</p>
              </div>
              <button onClick={handleCheckout} className="shopping__checkout">
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="shopping__empty-box">
            <h2 className="shopping__empty-title">Your cart is empty</h2>
            <img
              src="img/cart-is-empty.png"
              alt="cart is empty"
              className="shopping__empty"
            />
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="shopping__modal-bg">
          <div className="shopping__modal">
            <h4 className="shopping__clear-text">
              Checkout is not implemented yet.
              <br />
              Do you want to clear the Cart?
            </h4>
            <div className="shopping__clear-buttons">
              <button
                onClick={closeModal}
                className="shopping__clear-button shopping__clear-cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeModal();
                  handleClearCart();
                }}
                className="shopping__clear-button"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
