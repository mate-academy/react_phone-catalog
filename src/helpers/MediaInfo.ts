import { Media, MediaWidth } from '../types/Media';

export function mediaInfo(): [screen: Media, size: number] {
  if (window.innerWidth < MediaWidth.tabletMinWidth) {
    return [Media.MOBILE, MediaWidth.mobileWidth];
  }

  if (window.innerWidth < MediaWidth.desktopSmallMinWidth) {
    return [Media.TABLET, MediaWidth.tabletWidth];
  }

  if (window.innerWidth < MediaWidth.desktopMinWidth) {
    return [Media.DESKTOP_SMALL, MediaWidth.desktopSmallWidth];
  }

  if (window.innerWidth < MediaWidth.screenMinWidth) {
    return [Media.DESKTOP, MediaWidth.desktopWidth];
  }

  return [Media.MOBILE, MediaWidth.mobileWidth];
}

export function itemsOnScreen() {
  switch (mediaInfo()[0]) {
    case Media.MOBILE:
      return 1;
    case Media.TABLET:
      return 2;
    case Media.DESKTOP_SMALL:
      return 3;
    case Media.DESKTOP:
      return 4;
    default:
      return 4;
  }
}
