import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import left from '../imgs/icons/Chevron (Arrow Left).svg';

export const HistoryBackPusher: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { t } = useTranslation();

  return (
    <div className="HistoryBackPusher" data-cy="backButton">
      <img
        src={left}
        alt="left"
        className="HistoryBackPusher__icon--left"
      />
      <button
        className="HistoryBackPusher__button"
        type="button"
        onClick={() => handleGoBack()}
      >
        {t('back')}
      </button>
    </div>
  );
};
