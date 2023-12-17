import varsScss from '../styles/utils/export.module.scss';

export enum Media {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP_SMALL = 'desktopSmall',
  DESKTOP = 'desktop',
  SCREEN = 'screen',
  SCREEN_LARGE = 'screenLarge',
}

export const MediaWidth = {
  mobileWidth: +varsScss.mobileWidth.match(/[0-9]+/g)[0] || 0,
  tabletWidth: +varsScss.tabletWidth.match(/[0-9]+/g)[0] || 0,
  desktopSmallWidth: +varsScss.desktopSmallWidth.match(/[0-9]+/g)[0] || 0, // eslint-disable-line
  desktopWidth: +varsScss.desktopWidth.match(/[0-9]+/g)[0] || 0,

  productCardGap: +varsScss.productCardGap.match(/[0-9]+/g)[0] || 0,

  mobileMinWidth: +varsScss.mobileMinWidth.match(/[0-9]+/g)[0] || 0,
  tabletMinWidth: +varsScss.tabletMinWidth.match(/[0-9]+/g)[0] || 0,
  desktopSmallMinWidth: +varsScss.desktopSmallMinWidth.match(/[0-9]+/g)[0] || 0, // eslint-disable-line
  desktopMinWidth: +varsScss.desktopMinWidth.match(/[0-9]+/g)[0] || 0,
  screenMinWidth: +varsScss.screenMinWidth.match(/[0-9]+/g)[0] || 0,
};
