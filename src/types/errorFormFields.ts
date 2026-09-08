import { FormFields } from './formFields';

export const errorFormFields: { [key: string]: string } = {
  [FormFields.FirstName]:
    'Please enter a valid first name (at least 2 letters)',
  [FormFields.LastName]: 'Please enter a valid last name (at least 2 letters)',
  [FormFields.MobilePhone]: 'Please enter a valid phone number (10–14 digits)',
  [FormFields.Address]: 'Address must be at least 3 characters long',
  [FormFields.CreditCard]:
    'Please enter a valid credit card number (16 digits)',
  [FormFields.ExpirationDate]: 'Please enter a valid date in MM/YY format',
  [FormFields.CVV]: 'Please enter a valid CVV (3 digits)',
};
