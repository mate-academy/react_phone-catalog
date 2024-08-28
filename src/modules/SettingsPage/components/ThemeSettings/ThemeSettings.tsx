import classNames from 'classnames';
import { ColorRadio } from '../../../shared/components/ColorRadio';
import styles from './ThemeSettings.module.scss';
import { useTheme } from '../../../shared/components/Contexts/ThemeContext';
import { Theme } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  className?: string;
};

export const ThemeSettings: React.FC<Props> = ({ className }) => {
  const { theme, handleThemeChange } = useTheme();
  const { themeSettingsTitle, themeSettingsLabel, bright, dark } =
    useLanguage().localeTexts;

  const handleColorChange = (newTheme: string) => {
    if (Object.values(Theme).includes(newTheme as Theme)) {
      handleThemeChange(newTheme as Theme);
    } else {
      throw new Error('Color theme is not valid!!!');
    }
  };

  return (
    <section className={classNames(styles.ThemeSettings, className)}>
      <h2 className={styles.Title}>{themeSettingsTitle}</h2>

      <ColorRadio
        title={themeSettingsLabel}
        options={[
          { name: Theme.Bright, label: bright, value: '#FFF' },
          { name: Theme.Dark, label: dark, value: '#0F1121' },
        ]}
        chosenColor={theme}
        onChange={handleColorChange}
      />
    </section>
  );
};
