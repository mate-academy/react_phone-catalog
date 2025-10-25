import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './BackButtom.module.scss';
import { Icon } from '../Icon';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={classNames(styles.button)}>
      <div className={classNames(styles.button__icon)}>
        <Icon path={'/img/icons/arrow-left-black.svg'} name={'back'} />
      </div>
      <span
        onClick={() => navigate(-1)}
        className={classNames(styles.button__text)}
      >
        Back
      </span>
    </div>
  );
};
