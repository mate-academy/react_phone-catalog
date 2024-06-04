import { IPhoneDetail } from '../types';

export const truncatePhoneId = (
  el: IPhoneDetail | null,
  id: string | undefined,
) => {
  const phoneEl = el && id?.split('-');
  const lastWord = phoneEl?.at(-1)?.length;

  phoneEl?.splice(-1, lastWord);

  return phoneEl?.join('-');
};
