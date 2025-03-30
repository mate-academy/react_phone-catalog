import { useContext, useState } from 'react';
import { CartStoreContext } from '../../Store/CartStore';
import { CartItem } from '../CartPage/components/CartItem';
import { DeliveryMethod, UpdatedProduct } from '../shared/Types/types';
import classNames from 'classnames';
import { CheckoutContext } from '../../Store/CheckoutStore';
import { CheckoutErrorsContext } from '../../Store/CheckoutErrorStore';
import { Modal } from '../shared/Modal/Modal';
import { ErrorMessage } from '../shared/ErrorMassages/ErrorMessage';

export const CheckoutOrderInfo = () => {
  const { cartList } = useContext(CartStoreContext);
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors, setErrors } = useContext(CheckoutErrorsContext);

  const [isModalActive, setIsModalActive] = useState(false);
  //const navigate = useNavigate();

  const handleModalClose = () => {
    //navigate('/');

    setIsModalActive(false);
  };

  const handleModalOpen = () => {
    setIsModalActive(true);
  };

  const totalItems = cartList.reduce((acc, cur: UpdatedProduct) => {
    return acc + cur.quantity;
  }, 0);

  const orderSum = cartList.reduce((acc, cur: UpdatedProduct) => {
    return cur.discount
      ? acc + cur.price * cur.quantity
      : acc + cur.fullPrice * cur.quantity;
  }, 0);

  const totalSum = checkoutData.discountInfo.isActive
    ? orderSum - orderSum * 0.1
    : orderSum;

  const checkForFilled = () => {
    const newError = { ...errors };

    if (
      (!checkoutData.firstName && !checkoutData.phone) ||
      (!checkoutData.email && !checkoutData.password)
    ) {
      newError.contactInfo = true;
    }

    if (checkoutData.deliveryMethod === DeliveryMethod.Unset) {
      newError.deliveryInfo = true;
    }

    if (!checkoutData.paymentMethod) {
      newError.paymentInfo = true;
    }

    setErrors(newError);
  };

  const noticeMessage =
    // eslint-disable-next-line max-len
    'Please, note that this is a mockup checkout. We do not collect any data. All information will be deleted after modal is closed.';

  return (
    <div className="checkout__info">
      <div className="checkout__info-head">
        <h2 className="title title--h2 checkout__text">Order information</h2>

        <p className="body-text">{`In your cart ${totalItems} ${totalItems > 1 ? 'items' : 'item'}:`}</p>
      </div>

      <div className="checkout__item-list">
        {cartList.map((item: UpdatedProduct) => (
          <CartItem key={item.itemId} cartItem={item} isCheckout={true} />
        ))}
      </div>

      <div className="checkout__bottom">
        <div className="checkout__promo-code">
          <p className="title title--h2">Promo Code</p>

          <div className="checkout__promo-block">
            <input
              type="text"
              className="checkout__promo-input"
              placeholder="Type to receive 10% off"
              value={checkoutData.discountInfo.code}
              onChange={event =>
                setCheckoutData({
                  ...checkoutData,
                  discountInfo: {
                    ...checkoutData.discountInfo,
                    code: event.target.value,
                  },
                })
              }
              disabled={checkoutData.discountInfo.isActive}
            />

            <button
              className={classNames(
                'checkout__button checkout__button--promo',
                {
                  'checkout__button--is-applied':
                    checkoutData.discountInfo.isActive,
                },
              )}
              onClick={() => {
                if (checkoutData.discountInfo.code.length > 0) {
                  setCheckoutData({
                    ...checkoutData,
                    discountInfo: {
                      ...checkoutData.discountInfo,
                      isActive: true,
                    },
                  });
                }
              }}
              disabled={checkoutData.discountInfo.isActive}
            >
              {checkoutData.discountInfo.isActive ? 'Applied' : 'Apply'}
            </button>
          </div>
        </div>

        <div className="checkout__total-info">
          <div className="checkout__total-block">
            <p className="title title--h4 checkout__total-text">Order sum:</p>

            <p className="title title--h4 checkout__total-text">{`${orderSum} usd`}</p>
          </div>

          <div className="checkout__total-block">
            <p className="title title--h4 checkout__total-text">Discount:</p>

            <p className="title title--h4 checkout__total-text">
              {checkoutData.discountInfo.isActive
                ? `- ${orderSum * 0.1} usd`
                : '---'}
            </p>
          </div>

          <div className="checkout__total-block">
            <p className="title title--h4 checkout__total-text">
              Delivery cost:
            </p>

            <p
              className="
                title title--h4 checkout__total-text checkout__total-text--free
              "
            >
              Free
            </p>
          </div>

          <div className="checkout__total-block">
            <p className="title title--h4 checkout__total-text">Total sum:</p>

            <p className="title title--h4 checkout__total-text">{`${totalSum} usd`}</p>
          </div>
        </div>

        <button
          className="checkout__button"
          onClick={() => {
            checkForFilled();

            handleModalOpen();
          }}
        >
          Submit order
        </button>

        {isModalActive && (
          <Modal title="Modal Title" onClose={handleModalClose}>
            <ErrorMessage title={noticeMessage} />
          </Modal>
        )}
      </div>
    </div>
  );
};
