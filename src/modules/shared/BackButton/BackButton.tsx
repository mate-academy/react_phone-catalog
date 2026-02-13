import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import cn from 'classnames';
import { useGlobalState } from '../../../context/store';

export const BackButton: FC = () => {
  const { theme } = useGlobalState();
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() =>
        navigate({
          pathname: state?.fromPath || '/',
          search: state?.fromSearch || '',
        })
      }
    >
      <span
        className={cn(styles.icon, { [styles.iconLight]: theme === 'light' })}
      ></span>
      Back
    </button>
  );
};
