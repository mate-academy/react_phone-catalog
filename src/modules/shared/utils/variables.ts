const CARD_WIDTH = 272;
const GAP = 16;

export const getProductsPerSlide = () => {
  const slideWidth = window.innerWidth;

  const productsCount = Math.floor((slideWidth + GAP) / (CARD_WIDTH + GAP));

  return Math.max(1, productsCount);
};
