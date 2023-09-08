const CONTAINER_WIDTH = 1136;
const CARD_WIDTH_WITH_GAP = 288;
const AMOUNT_OF_CARDS = 4;

export const transformStyle = (index: number) => {
  return {
    transform: `translateX(-${
      ((CARD_WIDTH_WITH_GAP * AMOUNT_OF_CARDS) / CONTAINER_WIDTH)
      * index
      * 100
    }%)`,
  };
};
