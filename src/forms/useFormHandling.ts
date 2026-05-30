import { useState } from 'react';
import { FormFields } from '../types/formFields';
import {
  formatExpirationDate,
  formatCreditCardNumber,
} from './formatInputFields';
import { formFieldsData } from './formFieldsValues';
import { errorFormFields } from '../types/errorFormFields';

export const useFormHandling = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let formattedValue = value;

    if (id === FormFields.ExpirationDate) {
      formattedValue = formatExpirationDate(value);
    } else if (id === FormFields.CreditCard) {
      formattedValue = formatCreditCardNumber(value);
    }

    setFormValues(prev => ({ ...prev, [id]: formattedValue }));
    setFormErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validateField = (id: string, value: string) => {
    const matchedField = formFieldsData.find(field => field.id === id);

    if (matchedField && matchedField.pattern) {
      const regex = new RegExp(matchedField.pattern);

      if (!regex.test(value)) {
        setFormErrors(prev => ({
          ...prev,
          [id]: errorFormFields[id] || 'This field is invalid',
        }));
      } else {
        setFormErrors(prev => ({ ...prev, [id]: '' }));
      }
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    validateField(id, value);
  };

  const validateFieldsOnSubmit = () => {
    const errors: { [key: string]: string } = {};

    formFieldsData.forEach(({ id, pattern }) => {
      const value = formValues[id] || '';
      const regex = new RegExp(pattern);

      if (!regex.test(value)) {
        errors[id] = errorFormFields[id] || 'This field is invalid';
      }
    });

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return {
    formValues,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateFieldsOnSubmit,
  };
};
