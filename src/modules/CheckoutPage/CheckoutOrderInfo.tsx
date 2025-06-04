/* eslint-disable max-len */
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
import { PrimaryButton } from '../shared/Shared_Components/ActionButtons/PrimaryButton';
import { scrollToTop } from '../../utils/scrollToTop';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../Store/StoreThemeMode';
import classNames from 'classnames';

export const CheckoutOrderInfo = () => {
  const { isDark } = useContext(DarkModeContext);
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

  const totalBlockInfo = [
    {
      title: 'Order sum:',
      value: `${orderSum} usd`,
    },
    {
      title: 'Discount:',
      value: checkoutData.discountInfo.isActive
        ? `- ${orderSum * 0.1} usd`
        : '---',
    },
    {
      title: 'Delivery cost:',
      value: 'Free',
      isFree: true,
    },
    {
      title: 'Total sum:',
      value: `${totalSum} usd`,
    },
  ];

  const noticeMessage =
    'Please, note that this is a mockup checkout. We do not collect any data. All information will be deleted after modal is closed.';

  return (
    <div className="checkout__info">
      <div
        className={classNames('checkout__info-head', {
          'checkout__info-head--dark': isDark,
        })}
      >
        <h2 className="title title--h2 checkout__text">Order information</h2>

        <p className="body-text">{`In your cart ${totalItems} ${totalItems > 1 ? 'items' : 'item'}:`}</p>
      </div>

      <div
        className={classNames('checkout__item-list', {
          'checkout__item-list--dark': isDark,
        })}
      >
        {cartList.map((item: UpdatedProduct) => (
          <CartItem key={item.itemId} cartItem={item} isCheckout={true} />
        ))}
      </div>

      <div className="checkout__bottom">
        <div className="checkout__promo-code">
          <h2
            className={classNames('title title--h2', {
              'title--is-Dark': isDark,
            })}
          >
            Promo Code
          </h2>

          <div className="checkout__promo-block">
            <input
              type="text"
              className={classNames('checkout__promo-input', {
                'checkout__promo-input--dark': isDark,
              })}
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
          {totalBlockInfo.map((block, index) => (
            <div
              key={index}
              className={classNames('checkout__total-block', {
                'checkout__total-block--dark': isDark,
              })}
            >
              <p className="title title--h4 checkout__total-text">
                {block.title}
              </p>

              <p
                className={classNames('title title--h4 checkout__total-text', {
                  'checkout__total-text--free': block.isFree,
                })}
              >
                {block.value}
              </p>
            </div>
          ))}
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
              manager may contact you in case of any inconvenience.
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
