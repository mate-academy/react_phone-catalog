import { Accessorie } from '../types/accessories';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablets';

export const findCountId = (
  devices: (Phone | Tablet | Accessorie)[],
  id: string,
) => {
  const sameDevice = devices.filter(d => d.id === id);

  return sameDevice.length;
};
