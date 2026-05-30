import { FC } from 'react';
import s from './ErrorNotice.module.scss';

interface Props {
  message: string;
  onReload: () => void;
}

export const ErrorNotice: FC<Props> = ({ message, onReload }) => {
  return (
    <div className={s.errorMessage}>
      <span>{message}</span>
      <button onClick={onReload} type="button" className={s.errorMessageButton}>
        Reload
      </button>
    </div>
  );
};
