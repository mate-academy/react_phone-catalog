export const buttonWidth = 32;
export const main = {
  tab: {
    size: 700,
    gap: 20,
  },
  desktop: {
    size: 1136,
    gap: 16,
  },

  phone: {
    size: 368,
    gap: 16,
  },
};

export const Slider = {
  phone: {
    step: main.phone.size + main.phone.gap - (buttonWidth * 3),
    items: 1,
  },

  tab: {
    step: main.tab.size + main.tab.gap,
    items: 3,
  },
  desktop: {
    step: main.desktop.size + main.desktop.gap,
    items: 4,
  },
};

export const paginationLimit = {
  phone: 5,
  tab: Math.ceil(
    (main.tab.size - ((buttonWidth + main.tab.gap) * 2)) / (buttonWidth + 8),
  ),
  desktop: 30,
};

export const itemsOnPage = {
  tab: ['15', '6', '3', 'all'],
  phone: ['16', '8', '4', 'all'],
  desktop: ['16', '8', '4', 'all'],
};
