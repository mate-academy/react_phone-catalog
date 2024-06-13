import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';
import { imgs, imgsMobile } from './imgsForDevices';

export function getImagesForSlider(windowSize: number) {
  if (windowSize <= WIDTH_DEVICES.mobile) {
    return imgsMobile.slice();
  }

  return imgs.slice();
}
