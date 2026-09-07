import { useEffect, useState } from 'react';
import { ValidationType } from '../types/ValidationType';
import { useTranslation } from 'react-i18next';

export const useValidation = (value: string, validations: ValidationType) => {
  const { t } = useTranslation();
  const [isEmptyError, setIsEmptyError] = useState('');
  const [minLengthError, setMinLengthError] = useState('');
  const [maxLengthError, setMaxLengthError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    const trimValue = value.trim();

    setIsEmptyError('');
    setMinLengthError('');
    setMaxLengthError('');
    setEmailError('');

    for (const key in validations) {
      const rule = validations[key as keyof ValidationType];

      switch (key) {
        case 'isEmpty':
          trimValue.length === 0
            ? setIsEmptyError(t('cart_page.form.errors.isEmpty'))
            : setIsEmptyError('');
          break;
        case 'minLength':
          trimValue.length < (rule as number)
            ? setMinLengthError(
                t('cart_page.form.errors.minLength', { rule: rule }),
              )
            : setMinLengthError('');
          break;
        case 'maxLength':
          trimValue.length > (rule as number)
            ? setMaxLengthError(
                t('cart_page.form.errors.maxLength', { rule: rule }),
              )
            : setMaxLengthError('');
          break;
        case 'isEmail':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          emailRegex.test(trimValue)
            ? setEmailError('')
            : setEmailError(t('cart_page.form.errors.isEmail'));
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmptyError || maxLengthError || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmptyError, maxLengthError, minLengthError, emailError]);

  return {
    isEmptyError,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
  };
};
