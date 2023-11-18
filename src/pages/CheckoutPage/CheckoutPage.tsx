import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Listbox } from '@headlessui/react';

import { useAppDispatch } from '../../store/hooks';
import * as goodsActions from '../../store/reducers/goodsSlice';

import { Dropdown } from '../../components/Dropdown/Dropdown';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';

import './CheckoutPage.scss';
import './CheckoutDropdown.scss';

type Props = {
  isPayNowButtonClicked: boolean,
  setIsPayNowButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCheckoutModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessCheckout: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPaynowOpened: React.Dispatch<React.SetStateAction<boolean>>,
};

type Inputs = {
  firstName: string,
  lastName: string,
  email: string,
  country: string | null,
  adress: string,
  zipCode: string,
  city: string,
  phoneNumber: string,
};

const countries = [
  'estonia',
  'england',
  'ukraine',
];

export const CheckoutPage: React.FC<Props> = React.memo(({
  isPayNowButtonClicked,
  setIsPayNowButtonClicked,
  setIsCheckoutModalOpened,
  setIsSuccessCheckout,
  setIsPaynowOpened,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Inputs>({
    defaultValues: {
      country: null,
    },
  });

  const [
    countryValue,
    setCountryValue,
    // eslint-disable-next-line no-underscore-dangle
  ] = useState<string | null>(control._defaultValues.country || null);

  const onSubmit = () => {
    if (isPayNowButtonClicked) {
      setIsCheckoutModalOpened(false);
      setIsPaynowOpened(true);
    } else {
      setIsCheckoutModalOpened(false);
      setIsSuccessCheckout(true);
      setIsPayNowButtonClicked(false);
      dispatch(goodsActions.clear());
    }
  };

  return (
    <form
      className="checkout"
      action="#"
      method="GET"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="checkout__items">
        <label className="checkout__item">
          {errors?.firstName && (
            <p className="checkout__item-error">
              {errors.firstName.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="text"
            placeholder={t('firstNamePlaceholder')}
            {...register(
              'firstName',
              {
                required: t('firstNameRequiredError'),
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯіїєґІЇЄҐšžõäöüŠŽÕÄÖÜ]+$/u,
                  message: t('firstNamePatternError'),
                },
              },
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.lastName && (
            <p className="checkout__item-error">
              {errors.lastName.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="text"
            placeholder={t('lastNamePlaceholder')}
            {...register(
              'lastName',
              {
                required: t('lastNameRequiredError'),
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯіїєґІЇЄҐšžõäöüŠŽÕÄÖÜ]+$/u,
                  message: t('lastNamePatternError'),
                },
              },
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.email && (
            <p className="checkout__item-error">
              {errors.email.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="email"
            placeholder={t('emailPlaceholder')}
            {...register(
              'email',
              {
                required: t('emailRequiredError'),
                pattern: {
                  // eslint-disable-next-line max-len
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t('emailPatternError'),
                },
              },
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.country && (
            <p className="checkout__item-error">
              {errors.country.message || t('unknownError')}
            </p>
          )}

          <Controller
            name="country"
            control={control}
            rules={{
              required: t('countryRequiredError'),
            }}
            render={({ field }) => (
              <Dropdown
                rootClassName="checkout"
                selectedItem={countryValue}
                setSelectedItem={setCountryValue}
                placeHolder={t('countryPlaceholder')}
              >
                {countries.map(country => (
                  <Listbox.Option
                    key={country}
                    className="checkout-dropdown-list-item"
                    onClick={() => field.onChange(t(country))}
                    {...field}
                  >
                    {t(country)}
                  </Listbox.Option>
                ))}
              </Dropdown>
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.adress && (
            <p className="checkout__item-error">
              {errors.adress.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="text"
            placeholder={t('addressPlaceholder')}
            {...register(
              'adress',
              {
                required: t('addressRequiredError'),
              },
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.zipCode && (
            <p className="checkout__item-error">
              {errors.zipCode.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="text"
            placeholder={t('zipCodePlaceholder')}
            {...register(
              'zipCode',
              {
                required: t('zipCodeRequiredError'),
                pattern: {
                  value: /^\d{5}-\d{4}$/,
                  message: t('zipCodePatternError'),
                },
              },
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.city && (
            <p className="checkout__item-error">
              {errors.city.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="text"
            placeholder={t('cityPlaceholder')}
            {...register(
              'city',
              {
                required: t('cityRequiredError'),
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯіїєґІЇЄҐšžõäöüŠŽÕÄÖÜ]+$/u,
                  message: t('cityPatternError'),
                },
              },
            )}
          />
        </label>

        <label className="checkout__item">
          {errors?.phoneNumber && (
            <p className="checkout__item-error">
              {errors.phoneNumber.message || t('unknownError')}
            </p>
          )}

          <input
            className="checkout__item-input"
            type="text"
            placeholder={t('phoneNumberPlaceholder')}
            {...register(
              'phoneNumber',
              {
                required: t('phoneNumberRequiredError'),
                pattern: {
                  value: /^\d+$/,
                  message: t('phoneNumberPatternError'),
                },
              },
            )}
          />
        </label>
      </div>

      <MainButton
        text={isPayNowButtonClicked ? t('continue') : t('checkout')}
        submit
        className="checkout__submit-button"
      />
    </form>
  );
});
