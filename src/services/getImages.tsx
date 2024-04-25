import { BASE_URL, handleResponse } from '../api';
import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';
import { imgs, imgsMobile } from '../modules/shared/imgsForDevices';
import { Picture } from '../types/Picture';

export function getImages(windowSize: number) {
  if (windowSize <= WIDTH_DEVICES.mobile) {
    return imgsMobile.slice();
  }

  return imgs.slice();
}

export async function getImagesFetch(windowSize: number) {
  let images: Picture[] = [];

  try {
    const response = await fetch(`${BASE_URL}slider.json`).then(handleResponse);

    images = await response.json();
  } catch {
    return;
  }

  if (windowSize <= WIDTH_DEVICES.mobile) {
    images.slice(0, 3);
  }

  images.slice(3);
}
