import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import { PhoneContext } from '../../utils/PhoneContext';

export const BagPage: React.FC = () => {
  const {
    bagPhones,
    removeInBag,
    showNotif,
    setShowNotif,
  } = useContext(PhoneContext);
  const [list, setList] = useState([...bagPhones]);

  useEffect(() => {
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  }, [showNotif]);

  useEffect(() => {
    setList(bagPhones);
  }, [bagPhones]);

  const addCount = (id: string) => {
    setList(list.map(phone => (phone.phoneId === id
      ? {
        ...phone,
        count: phone.count ? phone.count + 1 : 1,
      }
      : phone)));
  };

  const decCount = (id: string) => {
    setList(list.map(phone => (phone.phoneId === id
      ? {
        ...phone,
        count: phone.count ? phone.count - 1 : 1,
      }
      : phone)));
  };

  const totalPrice = list
    .map(phone => (phone.count
      ? phone.price * phone.count
      : phone.price))
    .reduce((x, y) => x + y, 0);

  const totalDevices = list
    .map(phone => (phone.count
      ? phone.count
      : 1))
    .reduce((x, y) => x + y, 0);

  return (
    <>
      {showNotif && (
        <Notification
          title="Sorry"
          text="That feature will be implemented soon"
        />
      )}

      {Boolean(!list.length) && (
        <NavLink to="/phones" className="BagPage_isEmpty">
          You have no items in your shopping cart.
        </NavLink>
      )}

      {Boolean(list.length) && (
        <div className="BagPage">
          <Link to="/" className="BagPage_nav">
            {'< Back'}
          </Link>

          <h1 className="BagPage_title">
            Cart
          </h1>

          <div className="BagPage_conteiner">
            <div className="BagPage_conteiner_catalog">
              {list.map(phone => (
                <div className="cart" key={phone.id}>
                  <button
                    type="button"
                    className="cart_button"
                    onClick={() => removeInBag(phone.phoneId)}
                  >
                    x
                  </button>
                  <Link
                    to={
                      phone.category !== 'tablet'
                        ? `/phones/${phone.phoneId}`
                        : `/tablets/${phone.phoneId}`
                    }
                    className="cart_image"
                  >
                    <img
                      src={phone.image}
                      alt="img"
                      className="cart_image_img"
                    />
                  </Link>
                  <Link
                    to={
                      phone.category !== 'tablet'
                        ? `/phones/${phone.phoneId}`
                        : `/tablets/${phone.phoneId}`
                    }
                    className="cart_title"
                  >
                    {phone.name}
                  </Link>
                  <div className="cart_counter">
                    <button
                      type="button"
                      className="cart_counter_buttons"
                      disabled={phone.count === 1}
                      onClick={() => decCount(phone.phoneId)}
                    >
                      -
                    </button>

                    <div className="cart_counter_count">
                      {phone.count}
                    </div>

                    <button
                      type="button"
                      className="cart_counter_buttons"
                      disabled={phone.count === 9}
                      onClick={() => addCount(phone.phoneId)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart_price">{`$${phone.count ? phone.price * phone.count : phone.price}`}</div>
                </div>
              ))}
            </div>

            <div className="BagPage_conteiner_total">
              <span className="BagPage_conteiner_total_sum">
                {`$${totalPrice}`}
              </span>
              <span className="BagPage_conteiner_total_text">
                {`Total for ${totalDevices} items`}
              </span>
              <div className="BagPage_conteiner_total_line" />
              <button
                type="button"
                className="BagPage_conteiner_total_button"
                onClick={() => setShowNotif(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
