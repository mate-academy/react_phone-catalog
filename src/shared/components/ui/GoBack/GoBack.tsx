import { useNavigate } from 'react-router-dom';

import { Icon } from '../Icon/Icon';
import { IconNames } from '../Icon/IconNames';

import styles from './GoBack.module.scss';

type Props = {
  message?: string;
  path?: string | number;
};

export const GoBack: React.FC<Props> = ({ message = 'Back', path = -1 }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (typeof path === 'number') {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <button className={styles.goBack} type="button" onClick={handleGoBack}>
      <Icon className={styles.arrowIcon} name={IconNames.Arrow} />
      <span className={styles.text}>{message}</span>
    </button>
  );
};
