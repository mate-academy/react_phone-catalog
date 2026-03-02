import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './BackButton.scss';

export const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="buttonBack">
      <button
        className="buttonBackLink"
        onClick={() => navigate(-1)}
      >
        {t('product_details.back')}
      </button>
    </div>
  );
};
