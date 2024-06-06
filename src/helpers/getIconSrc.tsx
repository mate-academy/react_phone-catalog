import { ThemeType } from '../contexts/ThemeContext/ThemeContext';

const ICON_BASE_PATH = `/img/icons`;

export const getIconSrc = (iconName: string, theme?: ThemeType) => {
  const themePath = theme === 'dark' ? `dark/` : '';

  return `${ICON_BASE_PATH}/${themePath}${iconName}.png`;
};
