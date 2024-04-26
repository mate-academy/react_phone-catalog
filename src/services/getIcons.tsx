import { BASE_URL, ICONS_URL } from "../modules/constants/URL's/URL's";

export function getIcons() {
  return {
    arrowDown: `${BASE_URL}${ICONS_URL}arrow-down.svg`,
    arrowUP: `${BASE_URL}${ICONS_URL}arrow-up.svg`,
    arrowClose: `${BASE_URL}${ICONS_URL}close.svg`,
    arrowFavourites: `${BASE_URL}${ICONS_URL}favourites.svg`,
    arrowHome: `${BASE_URL}${ICONS_URL}home.svg`,
    arrowMenu: `${BASE_URL}${ICONS_URL}menu.svg`,
    arrowLeft: `${BASE_URL}${ICONS_URL}arrow-left.svg`,
    arrowRight: `${BASE_URL}${ICONS_URL}arrow-right.svg`,
    arrowReload: `${BASE_URL}${ICONS_URL}reload.svg`,
    arrowShoppingCart: `${BASE_URL}${ICONS_URL}shopping-cart.svg`,
  };
}
