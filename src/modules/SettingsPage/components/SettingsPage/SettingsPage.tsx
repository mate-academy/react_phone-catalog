import { LanguageSettings } from '../LanguageSettings';
import { PathNavigation } from '../../../shared/components/PathNavigation';
import { ThemeSettings } from '../ThemeSettings';
import styles from './SettingsPage.module.scss';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

export const SettingsPage: React.FC = () => {
  const { settingsTitle } = useLanguage().localeTexts;

  return (
    <>
      <PathNavigation path={[settingsTitle]} goBack />

      <main className={styles.SettingsPage}>
        <h1 className={styles.Title}>{settingsTitle}</h1>
        <ThemeSettings className={styles.Section} />
        <LanguageSettings className={styles.Section} />
      </main>
    </>
  );
};
