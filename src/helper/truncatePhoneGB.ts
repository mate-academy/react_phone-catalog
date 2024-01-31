import { IPhoneDetail } from '../types/PhoneDetail.interface';

export const truncatePhoneGB = (
  el: IPhoneDetail | null,
  id: string | undefined,
  value: string,
) => {
  const phoneGB = el && id?.split('-');

  const modifyPhoneGB = phoneGB?.map(
    (item) => (item.includes('gb') ? value.toLowerCase() : item),
  ).join('-');

  return modifyPhoneGB;
};
