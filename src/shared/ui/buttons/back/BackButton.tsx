import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

type Props = {
  pathname: string;
};

export const BackButton: React.FC<Props> = ({ pathname }) => {
  const navigate = useNavigate();
  const firstSegment = pathname.split('/')[1];
  const breadcrumbsTitle =
    firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);

  return (
    <div
      className={styles.backButton}
      onClick={() => {
        navigate(`/${breadcrumbsTitle}`);
      }}
    >
      <img src={`img/icons/arrowLeft.svg`} alt="arrow right" />
      <p className={`small-text ${styles.backButtonTitle}`}>Back</p>
    </div>
  );
};
