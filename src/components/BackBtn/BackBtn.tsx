// BackBtn.tsx
import { useNavigate } from 'react-router-dom';
import styles from './BackBtn.module.scss'; // якщо є файл зі стилями

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
      <img src="/icons/arrow-left.svg" alt="btn back" className={styles.icon} />
      <span>Back</span>
    </button>
  );
};
