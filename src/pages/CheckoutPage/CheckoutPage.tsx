import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import * as goodsActions from '../../store/reducers/goodsSlice';

import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import './CheckoutPage.scss';

type Props = {
  isPayNowButtonClicked: boolean,
  setIsPayNowButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCheckoutModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessCheckout: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPaynowOpened: React.Dispatch<React.SetStateAction<boolean>>,
};

export const CheckoutPage: React.FC<Props> = React.memo(({
  isPayNowButtonClicked,
  setIsPayNowButtonClicked,
  setIsCheckoutModalOpened,
  setIsSuccessCheckout,
  setIsPaynowOpened,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <form
      action="#"
      onSubmit={(event) => event.preventDefault()}
    >
      {isPayNowButtonClicked ? (
        <MainButton
          text={t('continue')}
          submit
          className="checkout__submit-button"
          onClick={() => {
            setIsCheckoutModalOpened(false);
            setIsPaynowOpened(true);
          }}
        />
      ) : (
        <MainButton
          text={t('checkout')}
          submit
          className="checkout__submit-button"
          onClick={() => {
            setIsCheckoutModalOpened(false);
            setIsSuccessCheckout(true);
            setIsPayNowButtonClicked(false);
            dispatch(goodsActions.clear());
          }}
        />
      )}
    </form>
  );
});
