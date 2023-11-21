import { Phone } from '../types/Phone';

export const checkPhoneId = (checkToPhoneId: Phone, cartPhone: Phone[]) => {
  const check = cartPhone.find(
    checkPhone => checkPhone.phoneId === checkToPhoneId.phoneId,
  );

  return check;
};

export const checkPhoneDetailsId = (
  checkToPhoneId: string,
  cartPhone: Phone[],
) => {
  const check = cartPhone.find(
    checkPhone => checkPhone.phoneId === checkToPhoneId,
  );

  return check;
};
