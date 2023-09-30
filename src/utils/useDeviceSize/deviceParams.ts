type Main = {
  [key: string]: {
    size: number,
    items: number,
  }
};

export const buttonWidth = 32;
export const main: Main = {
  min: {
    size: 220,
    items: 1,
  },
  sm: {
    size: 220,
    items: 2,
  },
  md: {
    size: 220,
    items: 3,
  },
  lg: {
    size: 220,
    items: 4,
  },
  xl: {
    size: 272,
    items: 4,
  },
};
const gap = 16;

const setSize = (val: string) => {
  return main[val].size * main[val].items + (gap * main[val].items);
};

export const Slider = {
  min: {
    step: setSize('min'),
    items: 1,
  },

  sm: {
    step: setSize('sm'),
    items: 2,
  },
  md: {
    step: setSize('md'),
    items: 3,
  },
  lg: {
    step: setSize('lg'),
    items: 4,
  },
  xl: {
    step: setSize('xl'),
    items: 4,
  },

};

export const itemsOnPage = {
  md: ['15', '6', '3', 'all'],
  sm: ['16', '8', '4', 'all'],
  lg: ['16', '8', '4', 'all'],
  xl: ['16', '8', '4', 'all'],
  min: ['16', '8', '4', 'all'],
};

export const paginationLimit = {
  sm: 5,
  md: 13,
  lg: 30,
  xl: 30,
  min: 3,
};
