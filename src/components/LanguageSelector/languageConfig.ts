import * as rawStyles from '../../styles/_variables.module.scss';

const styles = rawStyles as { [key: string]: string };

export interface LanguageConfig {
  id: string;
  nameKey: string;
  label: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    id: 'uk',
    nameKey: 'ukrainian',
    label: 'UA',
    backgroundColor: styles.white || '#fff',
    textColor: styles.blueSky || '#3D7FFF',
    accentColor: styles.yellow || '#ffd700',
  },

  {
    id: 'en',
    nameKey: 'english',
    label: 'EN',
    backgroundColor: styles.blackDeep || '#1a1a1a',
    textColor: styles.greyCharcoal || '#313237',
    accentColor: styles.brightBlue || '#0057b7',
  },
];
