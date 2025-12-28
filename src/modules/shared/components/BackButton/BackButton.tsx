import { useNavigate } from 'react-router';
import styles from './BackButton.module.scss';
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4708 3.52864C10.2104 3.26829 9.78829 3.26829 9.52794 3.52864L5.52794 7.52864C5.26759 7.78899 5.26759 8.2111 5.52794 8.47145L9.52794 12.4714C9.78829 12.7318 10.2104 12.7318 10.4708 12.4714C10.7311 12.2111 10.7311 11.789 10.4708 11.5286L6.94216 8.00004L10.4708 4.47145C10.7311 4.2111 10.7311 3.78899 10.4708 3.52864Z"
          fill="currentColor"
        />
      </svg>

      {/* FIXED: BEM Element */}
      <span>{label}</span>
    </button>
  );
};
