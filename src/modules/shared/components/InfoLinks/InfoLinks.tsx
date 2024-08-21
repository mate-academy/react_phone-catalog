import { useLanguage } from '../Contexts/LanguageContext';
import { InfoLink } from '../InfoLink/InfoLink';
import styles from './InfoLinks.module.scss';

export const InfoLinks: React.FC = () => {
  const { github, contacts, rights } = useLanguage().localeTexts;

  return (
    <menu className={styles.InfoLinks}>
      <InfoLink title={github} to="#" />
      <InfoLink title={contacts} to="#" />
      <InfoLink title={rights} to="#" />
    </menu>
  );
};
