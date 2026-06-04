import { Theme } from '../../context/ThemeContext';

import * as rawStyles from '../../styles/_variables.module.scss';

const styles = rawStyles as { [key: string]: string };

export interface ThemeConfig {
  id: Theme;
  nameKey: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  iconAccent: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'original-light' as const,
    nameKey: 'originalLight',
    backgroundColor: styles.white,
    textColor: styles.greyCharcoal,
    buttonColor: styles.greyCharcoal,
    iconAccent: styles.purple,
  },
  {
    id: 'original-dark' as const,
    nameKey: 'originalDark',
    backgroundColor: styles.blackDeep,
    textColor: styles.whiteOff,
    buttonColor: styles.purple,
    iconAccent: styles.whiteOff,
  },
  {
    id: 'ice-cap' as const,
    nameKey: 'roundedPurpleBlue',
    backgroundColor: styles.whiteOff,
    textColor: styles.black,
    buttonColor: styles.blueViolet,
    iconAccent: styles.blueBright,
  },
  {
    id: 'electric-cyan' as const,
    nameKey: 'purpleBlue',
    backgroundColor: styles.cyanNeon,
    textColor: styles.black,
    buttonColor: styles.blueBright,
    iconAccent: styles.blueViolet,
  },
  {
    id: 'apricot-sorbet' as const,
    nameKey: 'purpleOrange',
    backgroundColor: styles.peach,
    textColor: styles.black,
    buttonColor: styles.orange,
    iconAccent: styles.greyCharcoal,
  },
] as const;

export type ThemeConfigArray = typeof THEMES;
