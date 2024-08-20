import { ThemeType } from '../contexts/ThemeContext/ThemeContext';
import { BASE_URL } from '../services/httpClient';

const ICON_BASE_PATH = `${BASE_URL}img/icons`;

export const getIconSrc = (iconName: string, theme?: ThemeType) => {
  const themePath = theme === 'dark' ? `dark/` : '';

  return `${ICON_BASE_PATH}/${themePath}${iconName}.png`;
};
