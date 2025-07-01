import React from 'react';
import styles from './BackButton.module.scss';
import ArrowLeft from 'assets/icons/ArrowRight.svg?react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  textButton?: string;
  className?: string;
  fallBackPath?: string;
};

export const BackButton: React.FC<Props> = ({
  textButton = 'Back',
  className,
  fallBackPath = '/',
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    const currentDomain = window.location.origin;
    const referrer = document.referrer;

    if (window.history.length > 1 && referrer.startsWith(currentDomain)) {
      navigate(-1);
    } else {
      navigate(fallBackPath);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className={cn(styles.wrapperBackButton, className)}
      aria-label={typeof textButton === 'string' ? textButton : 'Go back'}
    >
      <ArrowLeft className={styles.arrowBackButton} />
      <p className={styles.textBackButton}>{t(`buttons.back`)}</p>
    </button>
  );
};
