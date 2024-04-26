import { BASE_URL, SLIDER_IMAGES_URL } from "../modules/constants/URL's/URL's";

export function getSliderImages() {
  return {
    mobileImage1: `${BASE_URL}${SLIDER_IMAGES_URL}mobile-slider-1.png`,
    mobileImage2: `${BASE_URL}${SLIDER_IMAGES_URL}mobile-slider-2.png`,
    mobileImage3: `${BASE_URL}${SLIDER_IMAGES_URL}mobile-slider-3.png`,
    tabletImage1: `${BASE_URL}${SLIDER_IMAGES_URL}tablet-slider-1.png`,
    tabletImage2: `${BASE_URL}${SLIDER_IMAGES_URL}tablet-slider-2.jpg`,
    tabletImage3: `${BASE_URL}${SLIDER_IMAGES_URL}tablet-slider-3.png`,
    tabletOrderNow: `${BASE_URL}${SLIDER_IMAGES_URL}tablet-order-now.png`,
  };
}
