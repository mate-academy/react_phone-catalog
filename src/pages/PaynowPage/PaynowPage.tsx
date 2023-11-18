import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../store/hooks';
import * as goodsActions from '../../store/reducers/goodsSlice';

import { MainButton } from '../../components/Buttons/MainButton/MainButton';

import './PaynowPage.scss';

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
    setIsPaynowOpened(false);
    setIsSuccessPaynow(true);
    dispatch(goodsActions.clear());
  };

  return (
    <form
      action="#"
      className="payNow"
      method="GET"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="payNow__items">
        <label className="payNow__item">
          {errors?.cardNumber && (
            <p className="payNow__item-error">
              {errors.cardNumber.message || t('unknownError')}
            </p>
          )}

          <input
            className="payNow__item-input"
            type="text"
            placeholder={t('cardNumberPlaceholder')}
            {...register(
              'cardNumber',
              {
                required: t('cardNumberRequiredError'),
                pattern: {
                  value: /^(\d{4}-){3}\d{4}$|^(\d{4} ){3}\d{4}$|^\d{16}$/,
                  message: t('cardNumberPatternError'),
                },
              },
            )}
          />
        </label>

        <label className="payNow__item">
          {errors?.nameOnCard && (
            <p className="payNow__item-error">
              {errors.nameOnCard.message || t('unknownError')}
            </p>
          )}

          <input
            className="payNow__item-input"
            type="text"
            placeholder={t('nameOnCardPlaceholder')}
            {...register(
              'nameOnCard',
              {
                required: t('nameOnCardRequiredError'),
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯіїєґІЇЄҐšžõäöüŠŽÕÄÖÜ]+$/u,
                  message: t('nameOnCardPatternError'),
                },
              },
            )}
          />
        </label>

        <label className="payNow__item">
          {errors?.cvc && (
            <p className="payNow__item-error">
              {errors.cvc.message || t('unknownError')}
            </p>
          )}

          <input
            className="payNow__item-input"
            type="text"
            placeholder={t('cvcPlaceholder')}
            {...register(
              'cvc',
              {
                required: t('cvcRequiredError'),
                pattern: {
                  value: /^\d{3}$/,
                  message: t('cvcPatternError'),
                },
              },
            )}
          />
        </label>

        <div className="payNow__items-extra">
          <label className="payNow__item">
            {errors?.month && (
              <p className="payNow__item-error">
                {errors.month.message || t('unknownError')}
              </p>
            )}

            <input
              className="payNow__item-input"
              type="text"
              placeholder={t('monthPlaceholder')}
              {...register(
                'month',
                {
                  required: t('monthRequiredError'),
                  pattern: {
                    value: /^[a-zA-Zа-яА-ЯіїєґІЇЄҐšžõäöüŠŽÕÄÖÜ]+$/u,
                    message: t('monthPatternError'),
                  },
                },
              )}
            />
          </label>

          <label className="payNow__item">
            {errors?.year && (
              <p className="payNow__item-error">
                {errors.year.message || t('unknownError')}
              </p>
            )}

            <input
              className="payNow__item-input"
              type="text"
              placeholder={t('yearPlaceholder')}
              {...register(
                'year',
                {
                  required: t('yearRequiredError'),
                  pattern: {
                    value: /^\d{4}$/,
                    message: t('yearPatternError'),
                  },
                },
              )}
            />
          </label>
        </div>
      </div>

      <MainButton
        text={t('payNow')}
        className="payNow__submit-button"
        submit
      />
    </form>
  );
});
