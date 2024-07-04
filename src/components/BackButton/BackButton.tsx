import { useNavigate } from 'react-router-dom';
import style from './BackButton.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';

type Props = {
  className?: string;
};

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  return (
    <span
      className={`${style.back} ${className}`}
      onClick={() => navigate(-1)}
    >
      {t('back')}
    </span>
  );
};
