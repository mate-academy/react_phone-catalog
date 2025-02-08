import { useLanguage } from '../Contexts/LanguageContext';
import { InfoLink } from '../InfoLink/InfoLink';
import styles from './InfoLinks.module.scss';

export const InfoLinks: React.FC = () => {
  const { github, contacts, rights } = useLanguage().localeTexts;

  return (
    <menu className={styles.InfoLinks}>
      <InfoLink
        title={github}
        to="https://github.com/aMtiIV/react_phone-catalog/tree/develop"
      />

      <InfoLink
        title={contacts}
        to="https://github.com/aMtiIV/react_phone-catalog/tree/develop"
      />

      <InfoLink
        title={rights}
        to="https://github.com/aMtiIV/react_phone-catalog/tree/develop"
      />
    </menu>
  );
};
