import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import './CartTotal.scss';
import { Error } from '../../types/others/types';

type Props = {
  total: number;
  itemsCount: number;
  setNotification: React.Dispatch<React.SetStateAction<Error>>;
};

export const CartTotal: React.FC<Props>
  = ({ total, itemsCount, setNotification }) => {
    const { cart, setCart } = useContext(ProductsContext);

    const orderPlaceHandler = () => {
      if (cart.length === 0) {
        setNotification({
          id: Date.now(),
          isError: true,
          type: 'warning',
          text: 'Cart is empty',
        });

        return;
      }

      // eslint-disable-next-line no-alert
      alert('We are sorry, but this feature is not implemented yet');

      setCart([]);

      setNotification({
        id: Date.now(),
        isError: true,
        type: 'success',
        text: 'Order placed successfully',
      });
    };

    return (
      <div className="CartTotal">
        <div className="CartTotal__info">
          <p className="CartTotal__info-price">
            {`$${total}`}
          </p>
          <p className="CartTotal__info-items">
            {`Total for ${itemsCount} items`}
          </p>
        </div>
        <div className="CartTotal__divider" />
        <button
          type="button"
          className="primary-button wide CartTotal__button"
          onClick={orderPlaceHandler}
        >
          Checkout
        </button>
      </div>
    );
  };
