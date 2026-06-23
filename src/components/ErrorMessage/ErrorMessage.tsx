import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onRetry: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="error-message">
      <h3 className="error-message__text">{t('error-message')}</h3>
      <button className="error-message__button" onClick={onRetry}>
        {t('reload')}
      </button>
    </div>
  );
};
