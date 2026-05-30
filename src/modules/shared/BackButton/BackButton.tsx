import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className={styles.backButton__Container}>
      <ChevronLeft className={styles.backButton__Icon} />
      <h4 className={styles.backButton__Text}>Back</h4>
    </div>
  );
};
