import React from 'react';
import styles from './BackButton.module.scss';
import ArrowDefault from '../../assets/icons/Chevron (Arrow Left).svg';
import ArrowHover from '../../assets/icons/ChevronLeftPurple.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${styles.backButton} ${className || ''}`}
    >
      <img src={hover ? ArrowHover : ArrowDefault} alt={t('back')} />
      <span className={hover ? styles.hoverText : ''}>{t('back')}</span>
    </div>
  );
};
