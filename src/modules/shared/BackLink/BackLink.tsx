import { useNavigate } from 'react-router-dom';
import styles from './BackLink.module.scss';

type Props = {
  className?: string;
};

export const BackLink: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <a
      className={`${styles.back} ${className ?? ''}`}
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <span>Back</span>
    </a>
  );
};
