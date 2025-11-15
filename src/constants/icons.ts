type IconMode = 'light' | 'dark';

type Icon = Record<IconMode, { title: string; path: string }>;

export const icons: Record<string, Icon> = {
  close: {
    light: {
      title: 'Close icon',
      path: './img/icons/close.svg',
    },
    dark: {
      title: 'Close dark icon',
      path: './img/icons/close-dark.svg',
    },
  },
  menu: {
    light: {
      title: 'Menu icon',
      path: './img/icons/menu.svg',
    },
    dark: {
      title: 'Menu dark icon',
      path: './img/icons/menu-dark.svg',
    },
  },
  search: {
    light: {
      title: 'Search icon',
      path: './img/icons/search.svg',
    },
    dark: {
      title: 'Search dark icon',
      path: './img/icons/search-dark.svg',
    },
  },
  heart: {
    light: {
      title: 'Heart icon',
      path: './img/icons/heart.svg',
    },
    dark: {
      title: 'Heart dark icon',
      path: './img/icons/heart-dark.svg',
    },
  },
  heart__selected: {
    light: {
      title: 'Selected heart icon',
      path: './img/icons/heart-selected.svg',
    },
    dark: {
      title: 'Selected heart dark icon',
      path: './img/icons/heart-selected-dark.svg',
    },
  },
  cart: {
    light: {
      title: 'Cart icon',
      path: './img/icons/cart.svg',
    },
    dark: {
      title: 'Cart dark icon',
      path: './img/icons/cart-dark.svg',
    },
  },
  arrow_down: {
    light: {
      title: 'Arrow down icon',
      path: './img/icons/arrow-down.svg',
    },
    dark: {
      title: 'Arrow down dark icon',
      path: './img/icons/arrow-down-dark.svg',
    },
  },
  arrow_left: {
    light: {
      title: 'Arrow left icon',
      path: './img/icons/arrow-left.svg',
    },
    dark: {
      title: 'Arrow left dark icon',
      path: './img/icons/arrow-left-dark.svg',
    },
  },
  arrow_left_disabled: {
    light: {
      title: 'Arrow left icon',
      path: './img/icons/arrow-left-disabled.svg',
    },
    dark: {
      title: 'Arrow left dark icon',
      path: './img/icons/arrow-left-disabled.svg',
    },
  },
  arrow_right: {
    light: {
      title: 'Arrow right icon',
      path: './img/icons/arrow-right.svg',
    },
    dark: {
      title: 'Arrow right dark icon',
      path: './img/icons/arrow-right-dark.svg',
    },
  },
  arrow_right_disabled: {
    light: {
      title: 'Arrow right icon',
      path: './img/icons/arrow-right-disabled.svg',
    },
    dark: {
      title: 'Arrow right dark icon',
      path: './img/icons/arrow-right-disabled.svg',
    },
  },
  arrow_up: {
    light: {
      title: 'Arrow up icon',
      path: './img/icons/arrow-up.svg',
    },
    dark: {
      title: 'Arrow up dark icon',
      path: './img/icons/arrow-up-dark.svg',
    },
  },
  home: {
    light: {
      title: 'Home icon',
      path: './img/icons/home.svg',
    },
    dark: {
      title: 'Home dark icon',
      path: './img/icons/home-dark.svg',
    },
  },
  minus: {
    light: {
      title: 'Minus icon',
      path: './img/icons/minus.svg',
    },
    dark: {
      title: 'Minus dark icon',
      path: './img/icons/minus-dark.svg',
    },
  },
  plus: {
    light: {
      title: 'Plus icon',
      path: './img/icons/plus.svg',
    },
    dark: {
      title: 'Plus dark icon',
      path: './img/icons/plus-dark.svg',
    },
  },
};
