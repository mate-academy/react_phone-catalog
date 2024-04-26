import { BASE_URL } from "../modules/constants/URL's/URL's";

export function getCategoryImgs() {
  return {
    phones: `${BASE_URL}img/category-phones-1.png`,
    tablets: `${BASE_URL}img/category-tablets.png`,
    accessories: `${BASE_URL}img/category-accessories.png`,
  };
}
