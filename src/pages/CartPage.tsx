import {
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../components/CartItem/CartItem';
import { NavbarContext } from '../context/NavbarContext';
import { getFinalPrice } from '../helpers/getFinalPrice';

export const CartPage = () => {
  const navigate = useNavigate();
  const { addedDevices } = useContext(NavbarContext);
  const [isClicked, setIsClicked] = useState(false);

  const getItemFromLS = (key: string) => {
    const res = localStorage.getItem(key);

    if (res) {
      return +res;
    }

    return 1;
  };

  const totalPrice = useMemo(() => {
    const prices = addedDevices
      .map(device => getFinalPrice(
        device.price, device.discount,
      ) * getItemFromLS(device.id));

    return prices.reduce((acc, price) => acc + price, 0);
  }, [addedDevices, isClicked]);

  const totalItems = useMemo(() => {
    let itemsCount = 0;

    addedDevices.forEach((device) => {
      const quantity = getItemFromLS(device.id);

      if (quantity) {
        itemsCount += +quantity;
      }
    });

    return itemsCount;
  }, [addedDevices, isClicked]);

  return (
    <div className="container container--min-h">
      <button
        data-cy="backButton"
        onClick={() => navigate(-1)}
        type="button"
        className="button__back"
      >
        <span className="arrow-left" />
        Back
      </button>
      <h1 className="devices__title devices__title--cart">Cart</h1>
      {!!addedDevices.length && (
        <div className="cart-main-wrapper">
          <div className="cart-wrapper">
            <div className="cart">
              {addedDevices.map((device) => (
                <CartItem
                  key={device.id}
                  product={device}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              ))}
            </div>

            <div className="cart-total">
              <p className="cart-total__price">{`$${totalPrice}`}</p>
              <p className="cart-total__items">
                {`Total for ${totalItems} items`}
              </p>
              <div className="horizontal-line horizontal-line--total" />
              <button type="button" className="cart-total__button">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      {!addedDevices.length && (
        <p className="cart-total__empty">Your cart is empty</p>
      )}
    </div>
  );
};
