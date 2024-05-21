import { WIDTH_DEVICES } from '../modules/constants/WIDTH_DEVICES';

export function getWidtScrollbar() {
  return document.documentElement.clientWidth !== window.innerWidth &&
    window.innerWidth < WIDTH_DEVICES.desctop
    ? 17
    : 0;
}
