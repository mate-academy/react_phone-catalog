import { useNavigate } from 'react-router-dom';
import { Icon } from '../../Icon';
import { useTranslate } from '../../../hooks/useTranslate';
import style from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const t = useTranslate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleGoBack} className={style.backButton}>
      <Icon name="arrowLeft" />
      {t('back.button')}
    </button>
  );
};
