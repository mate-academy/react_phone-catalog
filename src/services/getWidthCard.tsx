import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';
import { WIDTH_CARD } from '../modules/constants/WIDTH_CARD';

export function getWidthCard(windowSize: number) {
  if (windowSize <= WIDTH_DEVICES.mobile) {
    return WIDTH_CARD.mobile;
  }

  if (windowSize > WIDTH_DEVICES.mobile && windowSize < WIDTH_DEVICES.desctop) {
    return WIDTH_CARD.tablet;
  }

  return WIDTH_CARD.desctop;
}
