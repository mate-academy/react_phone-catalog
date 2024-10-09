import { HandleReloadClick } from '../../types/handlers';
import { useLanguage } from '../Contexts/LanguageContext';
import { ReloadButton } from '../ReloadButton';
import styles from './ErrorNotification.module.scss';

type Props = {
  onReloadClick: HandleReloadClick;
  responseStatus?: number;
};

export const ErrorNotification: React.FC<Props> = ({
  onReloadClick,
  responseStatus,
}) => {
  const { wrong, error } = useLanguage().localeTexts;

  return (
    <section className={styles.ErrorNotification}>
      {wrong}
      <br />
      {responseStatus && `${error} ${responseStatus}`}
      <ReloadButton onReloadClick={onReloadClick} />
    </section>
  );
};
