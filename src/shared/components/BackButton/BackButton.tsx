import { useNavigate } from 'react-router';
import styles from './BackButton.module.scss';
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon';
type BackButtonProps = {
  label?: string;
};
export const BackButton: React.FC<BackButtonProps> = ({ label }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button className={styles.backBtn} onClick={handleBack}>
      <ArrowIcon direction="left" />

      <span>{label}</span>
    </button>
  );
};
