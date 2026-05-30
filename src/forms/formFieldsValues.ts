import { FormFields } from '../types/formFields';
import { InputType } from '../types/inputTypes';
import { patterns } from '../types/patterns';
import { PlaceholderText } from '../types/placeholder';

export const formFieldsData = [
  {
    id: FormFields.FirstName,
    type: InputType.Text,
    label: 'First Name',
    pattern: patterns.name,
    placeholder: PlaceholderText.FirstName,
  },
  {
    id: FormFields.LastName,
    type: InputType.Text,
    label: 'Last Name',
    pattern: patterns.name,
    placeholder: PlaceholderText.LastName,
  },
  {
    id: FormFields.MobilePhone,
    type: InputType.Tel,
    label: 'Phone Number',
    pattern: patterns.phoneNumber,
    placeholder: PlaceholderText.PhoneNumber,
  },
  {
    id: FormFields.Address,
    type: InputType.Text,
    label: 'Address',
    pattern: patterns.address,
    placeholder: PlaceholderText.Address,
  },
  {
    id: FormFields.CreditCard,
    type: InputType.Text,
    label: 'Credit Card',
    pattern: patterns.creditCard,
    placeholder: PlaceholderText.CreditCard,
    maxLength: 16,
  },
  {
    id: FormFields.ExpirationDate,
    type: InputType.Text,
    label: 'Expiration Date',
    pattern: patterns.expirationDate,
    placeholder: PlaceholderText.ExpirationDate,
    maxLength: 5,
  },
  {
    id: FormFields.CVV,
    type: InputType.Text,
    label: 'CVV',
    pattern: patterns.cvv,
    placeholder: PlaceholderText.CVV,
    maxLength: 3,
  },
];
