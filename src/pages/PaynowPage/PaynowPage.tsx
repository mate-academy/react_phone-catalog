import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import * as goodsActions from '../../store/reducers/goodsSlice';

import './PaynowPage.scss';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';

type Props = {
  setIsPaynowOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessPaynow: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PaynowPage: React.FC<Props> = React.memo(({
  setIsPaynowOpened,
  setIsSuccessPaynow,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <form
      action="#"
      onSubmit={(event) => event.preventDefault()}
    >
      <MainButton
        text={t('payNow')}
        className="paynow__submit-button"
        submit
        onClick={() => {
          setIsPaynowOpened(false);
          setIsSuccessPaynow(true);
          dispatch(goodsActions.clear());
        }}
      />
    </form>
  );
});
