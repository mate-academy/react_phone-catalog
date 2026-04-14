import { Link, useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { Icon } from '../Icon';

interface Props {
  to?: string;
}

export const BackButton: React.FC<Props> = ({ to }) => {
  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent) => {
    if (!to) {
      e.preventDefault();
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/phones');
      }
    }
  };

  const content = (
    <>
      <Icon variant="arrow-left" className={styles.backIcon} />
      <span className="small-text">Back</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={styles.backButton}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleGoBack} className={styles.backButton}>
      {content}
    </button>
  );
};
