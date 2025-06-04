import React, { useContext, useState } from 'react';
import { FormTypes } from '../../../Types/types';
import { onlyNumbersRegEx } from '../../../../../utils/regEx';
import { PrimaryButton } from '../../ActionButtons/PrimaryButton';
import { DarkModeContext } from '../../../../../Store/StoreThemeMode';
import classNames from 'classnames';

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
  const { isDark } = useContext(DarkModeContext);

  const keyValues = Object.keys(inputValue);
  const propertyValues = Object.values(inputValue);
  const topInputValue = propertyValues[0];
  const bottomInputValue = propertyValues[1];
  const [lastKey, setLastKey] = useState('');
  const previousNumber = bottomInputValue;

  const onFocusHandler = () => {
    setTimeout(() => {
      if (bottomInputValue === '') {
        setInputValue(keyValues[1], '+380 XX XXX XX XX');
      }

      const phoneInput: HTMLInputElement = document.getElementById(
        'phone-input',
      ) as HTMLInputElement;

      phoneInput?.focus();
      phoneInput?.setSelectionRange(5, 5);
    }, 0);
  };

  const changePhoneNum = () => {
    let newVal = '';
    const countryCode = previousNumber.slice(0, 5);

    if (lastKey === 'Backspace') {
      const modifiedNum = previousNumber
        .slice(5, previousNumber.length)
        .replaceAll(' ', '-')
        .split('')
        .reverse()
        .join('')
        .replace(/[0-9]/, 'X')
        .split('')
        .reverse()
        .join('')
        .replaceAll('-', ' ');

      newVal = countryCode + modifiedNum;
    } else if (onlyNumbersRegEx.test(lastKey)) {
      newVal = previousNumber.replace('X', lastKey);
    }

    return newVal;
  };

  const onChangeHandler = () => {
    if (lastKey === 'Backspace' || onlyNumbersRegEx.test(lastKey)) {
      setInputValue(keyValues[1], changePhoneNum());
    }

    return;
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  };

  return (
    <form
      name={formType}
      id={formType}
      action=""
      className="checkout__form-block"
      onSubmit={e => e.preventDefault()}
    >
      <input
        type={formType === FormTypes.SignUp ? 'text' : 'email'}
        className={classNames(
          'checkout__promo-input checkout__promo-input--is-log-in',
          { 'checkout__promo-input--dark': isDark },
        )}
        placeholder={formType === FormTypes.SignUp ? 'Name' : 'Email'}
        value={topInputValue}
        onChange={event => setInputValue(keyValues[0], event.target.value)}
        required
      />

      {formType === FormTypes.SignUp ? (
        <input
          type="tel"
          id="phone-input"
          className={classNames(
            'checkout__promo-input checkout__promo-input--is-log-in',
            { 'checkout__promo-input--dark': isDark },
          )}
          placeholder="+380 XX XXX XX XX"
          value={bottomInputValue}
          required
          onFocus={onFocusHandler}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
      ) : (
        <input
          type="password"
          className={classNames(
            'checkout__promo-input checkout__promo-input--is-log-in',
            { 'checkout__promo-input--dark': isDark },
          )}
          placeholder="Enter your password"
          value={bottomInputValue}
          required
          onChange={event => setInputValue(keyValues[1], event.target.value)}
          autoComplete="off"
        />
      )}

      <PrimaryButton
        title={formType === FormTypes.SignUp ? 'Continue' : 'Submit'}
        onClickHandler={() => {}}
        height={48}
      />
    </form>
  );
};
