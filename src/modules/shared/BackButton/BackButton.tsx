import styles from './BackButton.module.scss';

import Icon from '../Icon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {}

const BackButton: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <a
      href="#"
      className={styles.buttonBack}
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <Icon iconStyles={{ image: ['arrowLeft'] }} />
      <span>{t('product-detail.back')}</span>
    </a>
  );
};

export default BackButton;
