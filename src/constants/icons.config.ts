import { IconConfig } from './types/type';

type IconTheme = 'light' | 'dark';
type IconVariant = Record<IconTheme, { title: string; path: string }>;

const ICON_BASE_PATH = './icons';

const createIconTitle = (
  name: string,
  theme: IconTheme,
  isDisabled = false,
): string => {
  const baseName = name.replace(/__\w+$/, '').replace(/_/g, ' ');
  const capitalizedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  const themeText = theme === 'dark' ? ' dark' : '';
  const disabledText = isDisabled ? ' disabled' : '';

  return `${capitalizedName}${disabledText}${themeText} icon`;
};

const createIconPath = (name: string, theme: IconTheme): string => {
  const isDisabled = name.includes('__disabled');
  const baseName = name
    .replace('__disabled', '')
    .replace('__filled', '__filled');

  if (theme === 'light') {
    if (
      ['Close', 'Menu', 'Home', 'Plus', 'Minus'].includes(
        baseName.charAt(0).toUpperCase() + baseName.slice(1),
      )
    ) {
      return `${ICON_BASE_PATH}/${baseName.charAt(0).toUpperCase() + baseName.slice(1)}.svg`;
    }

    return `${ICON_BASE_PATH}/${isDisabled ? name : baseName}.svg`;
  }

  return `${ICON_BASE_PATH}/${name.includes('__') ? name.replace('__', '_dark__') : `${baseName}_dark`}.svg`;
};

const iconConfigs: IconConfig[] = [
  { name: 'close', title: 'Close' },
  { name: 'close__disabled', title: 'Close', hasThemeVariants: false },
  { name: 'menu', title: 'Menu' },
  { name: 'search', title: 'Search' },
  { name: 'favorites', title: 'Favorites' },
  {
    name: 'favorites__filled',
    title: 'Favorites filled',
    hasThemeVariants: false,
  },
  { name: 'shopping_cart', title: 'Shopping cart' },
  { name: 'arrow_left', title: 'Arrow left' },
  { name: 'arrow_left__disabled', title: 'Arrow left disabled' },
  { name: 'arrow_right', title: 'Arrow right' },
  { name: 'arrow_right__disabled', title: 'Arrow right disabled' },
  {
    name: 'arrow_down',
    title: 'Arrow down',
    hasThemeVariants: false,
    darkPath: './icons/arrow_down_dark.svg',
  },
  { name: 'home', title: 'Home' },
  { name: 'plus', title: 'Plus' },
  { name: 'minus', title: 'Minus' },
  { name: 'minus__disabled', title: 'Minus disabled' },
];

const generateIconVariant = (config: IconConfig): IconVariant => {
  const { name, title, hasThemeVariants = true, darkPath } = config;

  if (!hasThemeVariants) {
    const path = darkPath || createIconPath(name, 'light');

    return {
      light: { title: `${title} icon`, path },
      dark: { title: `${title} icon`, path },
    };
  }

  return {
    light: {
      title: createIconTitle(name, 'light', name.includes('__disabled')),
      path: createIconPath(name, 'light'),
    },
    dark: {
      title: createIconTitle(name, 'dark', name.includes('__disabled')),
      path: createIconPath(name, 'dark'),
    },
  };
};

export const icons: Record<string, IconVariant> = iconConfigs.reduce(
  (acc, config) => ({
    ...acc,
    [config.name]: generateIconVariant(config),
  }),
  {} as Record<string, IconVariant>,
);

export type { IconTheme, IconVariant };
