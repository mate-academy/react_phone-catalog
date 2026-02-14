/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import Slider from './imgs/slider-btn-default.svg';
//@ts-ignore
import Close from './imgs/closeImg.svg';
//@ts-ignore
import Home from './imgs/home.svg';
//@ts-ignore
import Plus from './imgs/plusImg.svg';
//@ts-ignore
import Minus from './imgs/minusImg.svg';
//@ts-ignore
import Search from './imgs/search.svg';
//@ts-ignore
import phone_big from './imgs/banner-first.svg';
//@ts-ignore
import phone_small from './imgs/banner-first-phone.svg';
//@ts-ignore
import tablet_big from './imgs/banner_tablet_big.png';
//@ts-ignore
import tablet_small from './imgs/banner_tablet_small.png';
//@ts-ignore
import accessories_big from './imgs/banner_accessories_big.png';
//@ts-ignore
import accessories_small from './imgs/banner_accessories_small.png';
//@ts-ignore
import categoty_phones from './imgs/category-phones.svg';
//@ts-ignore
import categoty_tablets from './imgs/category-tablets.svg';
//@ts-ignore
import categoty_accessories from './imgs/category-accessories.svg';
//@ts-ignore
import arrow from './imgs/arrow-link.svg';
//@ts-ignore
import arrow_back from './imgs/arrow-back.svg';
//@ts-ignore
import not_found_page from './imgs/notFoundImg.png';
//@ts-ignore
import not_found_product from './imgs/notFoundProduct.png';
//@ts-ignore
import heart from './imgs/heart.svg';
//@ts-ignore
import heart_selected from './imgs/heart-selected.svg';
//@ts-ignore
import empty_cart from './imgs/cart-is-empty.png';

export const Images = {
  Button: { Slider, Close, Home, Search },
  Operation: { Plus, Minus },
  Banner: {
    Big: {
      Phones: phone_big,
      Tablets: tablet_big,
      Accessories: accessories_big,
    },
    Small: {
      Phones: phone_small,
      Tablets: tablet_small,
      Accessories: accessories_small,
    },
  },
  Categoty: {
    Phones: categoty_phones,
    Tablets: categoty_tablets,
    Accessories: categoty_accessories,
  },
  Arrow: { Default: arrow, Back: arrow_back },
  NotFound: { Page: not_found_page, Product: not_found_product },
  Heart: { Default: heart, Selected: heart_selected },
  EmptyCart: empty_cart,
};
