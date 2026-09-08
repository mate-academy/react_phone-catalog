import { useNavigate } from 'react-router-dom';
import { icons } from '../../constants/icons';
import { Icon } from '../icons';
import styles from './backBtn.module.scss';

type Props = {
  to?: string;
};

export const BackBtn: React.FC<Props> = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.buttonBack} onClick={handleClick}>
      <Icon icon={icons.arrowLeft} />
      <span>Back</span>
    </div>
  );
};
