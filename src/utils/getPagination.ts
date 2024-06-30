import { dots } from '../constants/dots';

export const getPagination = {
  smallScreens(numberOfPages: number, selectedPage: number) {
    const buttons: (number | string)[] = Array.from(
      Array(numberOfPages + 1).keys(),
    ).slice(1);

    if (numberOfPages <= 4) {
      return buttons;
    }

    if (selectedPage <= numberOfPages - 3) {
      const startIndex = selectedPage - 2 > 0 ? selectedPage - 2 : 0;

      return [
        ...buttons.slice(startIndex, startIndex + 3),
        dots.start,
        numberOfPages,
      ];
    } else {
      const rest = numberOfPages - 3;
      const hideButtons = rest > 1 ? dots.end : numberOfPages - 1;

      return [1, hideButtons, ...buttons.slice(-3)];
    }
  },

  bigScreens(numberOfPages: number, selectedPage: number) {
    const buttons: (number | string)[] = Array.from(
      Array(numberOfPages + 1).keys(),
    ).slice(1);

    if (numberOfPages <= 6) {
      return buttons;
    }

    if (selectedPage <= 4) {
      return [...buttons.slice(0, 4), dots.start, numberOfPages];
    } else if (selectedPage <= numberOfPages - 4 && selectedPage > 4) {
      const buttonsMiddle = [selectedPage - 1, selectedPage, selectedPage + 1];

      return [1, dots.start, ...buttonsMiddle, dots.end, numberOfPages];
    } else {
      const rest = numberOfPages - 4;
      const hideButtons = rest > 1 ? dots.end : numberOfPages - 1;

      return [1, hideButtons, ...buttons.slice(-4)];
    }
  },
  itemValue(
    value: string | number,
    index: number,
    visibleButtons: (string | number)[],
    selectedPage: number,
  ) {
    const previousValue = visibleButtons[index - 1];
    const nextValue = visibleButtons[index + 1];

    if (typeof value === 'number') {
      return value;
    }

    switch (value) {
      case dots.start:
        return +previousValue + 1;

      case dots.end:
        return +nextValue - 1;

      default:
        return selectedPage;
    }
  },
};
