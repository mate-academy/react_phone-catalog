import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import './notification.scss';

interface Props {
  message: string;
}

export const Notification: FC<Props> = ({ message }) => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className={`notification notification--${theme}`}>
      <h2 className="notification__message">{message}</h2>
    </div>
  );
};
