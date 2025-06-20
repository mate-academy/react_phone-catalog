export const getCardsToShow = () => {
  const widthPh = window.innerWidth || 0;

  if (widthPh >= 640) {
    return 16;
  }

  if (widthPh >= 320) {
    return 15;
  }

  return 0;
};
