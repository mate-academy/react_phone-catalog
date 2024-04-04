import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';
import { imgs, imgsMobile } from '../modules/shared/imgsForDevices';

export function getImages(windowSize: number) {
  if (windowSize <= WIDTH_DEVICES.mobile) {
    return imgsMobile.slice();
  }

  return imgs.slice();
}
