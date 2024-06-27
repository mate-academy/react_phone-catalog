import { PADDINGS } from '../modules/constants/PADDINGS';
import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';

export function getPadding(windowSize: number) {
  if (windowSize <= WIDTH_DEVICES.mobile) {
    return PADDINGS.mobile;
  }

  if (windowSize > WIDTH_DEVICES.mobile && windowSize < WIDTH_DEVICES.desctop) {
    return PADDINGS.tablet;
  }

  return PADDINGS.desctop;
}
