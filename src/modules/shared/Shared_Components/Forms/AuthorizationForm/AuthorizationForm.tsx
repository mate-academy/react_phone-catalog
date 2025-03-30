import React from 'react';
import { FormTypes } from '../../../Types/types';

interface Props {
  formType: FormTypes;
  inputValue: {
    [v: string]: string;
  };
  setInputValue: (key: string, value: string) => void;
}

export const AuthorizationForm: React.FC<Props> = ({
  formType,
  inputValue,
  setInputValue,
}) => {
  const keyValues = Object.keys(inputValue);
  const propertyValues = Object.values(inputValue);
  const topInputValue = propertyValues[0];
  const bottomInputValue = propertyValues[1];

  return (
    <form
      name={formType}
      id={formType}
      action=""
      className="checkout__form-block"
    >
      <input
        type={formType === FormTypes.SignUp ? 'text' : 'email'}
        className="
          checkout__promo-input
          checkout__promo-input--is-log-in
        "
        placeholder={formType === FormTypes.SignUp ? 'Name' : 'Email'}
        value={topInputValue}
        onChange={event => setInputValue(keyValues[0], event.target.value)}
        required
      />

      <input
        type={formType === FormTypes.SignUp ? 'tel' : 'password'}
        id="phone-input"
        className="
            checkout__promo-input
            checkout__promo-input--is-log-in
          "
        placeholder={
          formType === FormTypes.SignUp
            ? '+380-XX-XXX-XX-XX'
            : 'Enter your password'
        }
        value={bottomInputValue}
        required
        //onClick={() => setInputValue(keyValues[1], '+380-XX-XXX-XX-XX')}
        onChange={event => setInputValue(keyValues[1], event.target.value)}
      />

      <button className="checkout__button">
        {formType === FormTypes.SignUp ? 'Continue' : 'Submit'}
      </button>
    </form>
  );
};
