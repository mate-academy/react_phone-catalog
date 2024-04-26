import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';
import { imgs, imgsMobile } from './imgsForDevices';

export function getImages(windowSize: number) {
  if (windowSize <= WIDTH_DEVICES.mobile) {
    return imgsMobile.slice();
  }

  return imgs.slice();
}
