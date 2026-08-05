// BackBtn.tsx
import { useNavigate } from 'react-router-dom';
import styles from './BackBtn.module.scss'; // якщо є файл зі стилями

import arrowLeft from '/icons/arrow-left.svg';

interface BackBtnProps {
  className?: string; // Додаємо опціональний className
}

export const BackBtn = ({ className = '' }: BackBtnProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // -1 повертає користувача на 1 крок назад у історії браузера
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className={`${styles.backBtn} ${className}`.trim()}
    >
      <img src={arrowLeft} alt="btn back" className={styles.icon} />
      <span>Back</span>
    </button>
  );
};
