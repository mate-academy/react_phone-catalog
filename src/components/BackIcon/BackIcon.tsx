import { useNavigate } from 'react-router-dom';
import styles from './BackIcon.module.scss';

import backIcon from '/img/icons/arrows/arrow-left-icon.svg';

type Props = {};

const BackIcon: React.FC<Props> = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('../');
  };

  return (
    <div className={styles.back} onClick={goBack}>
      <img src={backIcon} alt="back-icon" />
      <p>Back</p>
    </div>
  );
};

export default BackIcon;
