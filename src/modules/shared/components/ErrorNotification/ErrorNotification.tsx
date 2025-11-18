import { FC } from 'react';
import s from './ErrorNotification.module.scss';

interface Props {
  message: string;
  onReload: () => void;
}

export const ErrorNotification: FC<Props> = ({ message, onReload }) => {
  return (
    <div className={s.errorMessage}>
      <span>{message}</span>
      <button onClick={onReload} type="button" className={s.errorMessageButton}>
        Reload
      </button>
    </div>
  );
};
