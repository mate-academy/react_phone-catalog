import { IPhoneDetail } from '../types';

export const truncatePhoneGB = (
  el: IPhoneDetail | null,
  id: string | undefined,
  value: string,
) => {
  const phoneGB = el && id?.split('-');

  const modifyPhoneGB = phoneGB?.map((item) => {
    if (item.includes('gb') || item.includes('tb') || item.includes('mm')) {
      return value.toLowerCase();
    }

    return item;
  }).join('-');

  return modifyPhoneGB;
};
