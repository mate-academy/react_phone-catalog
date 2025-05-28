import { useContext, useState } from 'react';
import { CartStoreContext } from '../../Store/CartStore';
import { CartItem } from '../CartPage/components/CartItem';
import {
  CheckoutData,
  DeliveryMethod,
  UpdatedProduct,
} from '../shared/Types/types';
import { CheckoutContext } from '../../Store/CheckoutStore';
import { CheckoutErrorsContext } from '../../Store/CheckoutErrorStore';
import { Modal } from '../shared/Modal/Modal';
import { ErrorMessage } from '../shared/ErrorMessages/ErrorMessage';
import { generateRandom } from '../../utils/generateRandom';
// eslint-disable-next-line max-len
import { PrimaryButton } from '../shared/Shared_Components/ActionButtons/PrimaryButton';
import { scrollToTop } from '../../utils/scrollToTop';
import { useNavigate } from 'react-router-dom';

export const CheckoutOrderInfo = () => {
  const { cartList, setCartList } = useContext(CartStoreContext);
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors, setErrors } = useContext(CheckoutErrorsContext);

  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    const defaultCheckoutValue: CheckoutData = {
      ...checkoutData,
      deliveryMethod: DeliveryMethod.Unset,
      paymentMethod: '',
      password: '',
      discountInfo: {
        isActive: false,
        code: '',
      },
      deliveryCity: '',
      deliverTo: '',
      buildingDetails: {
        building: '',
        entrance: '',
        apartment: '',
      },
    };

    setIsModalActive(false);
    setCartList([]);
    setCheckoutData(defaultCheckoutValue);
    navigate('/');
    scrollToTop();
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

    if (!checkoutData.firstName || !checkoutData.phone) {
      newError.contactInfo = true;
    }

    if (checkoutData.deliveryMethod === DeliveryMethod.Unset) {
      newError.deliveryInfo = true;
    }

    if (!checkoutData.paymentMethod) {
      newError.paymentInfo = true;
    }

    const isError = Object.values(newError).some(e => e);

    setErrors(newError);

    return isError;
  };

  const onCheckoutHandler = () => {
    if (checkForFilled()) {
      return;
    }

    handleModalOpen();
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

            <PrimaryButton
              title={checkoutData.discountInfo.isActive ? 'Applied' : 'Apply'}
              onClickHandler={() => {
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
              isDisabled={checkoutData.discountInfo.isActive}
              width={'30%'}
              height={48}
            />
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

        <PrimaryButton
          title="Submit order"
          isDisabled={false}
          onClickHandler={onCheckoutHandler}
          height={48}
        />

        {isModalActive && (
          <Modal title="Thank you!" onClose={handleModalClose}>
            <h3 className="title title--h3">
              {`Order number 000${generateRandom(250)} has been received!`}
            </h3>

            <p className="body-text">
              Your order may take up to 3 business days to be shipped. Our
              manager may contact you in case any inconvenience.
            </p>

            <PrimaryButton
              title="Go back to Home"
              onClickHandler={handleModalClose}
            />

            <ErrorMessage title={noticeMessage} />
          </Modal>
        )}
      </div>
    </div>
  );
};
