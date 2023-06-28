import { FC } from 'react';
import { Notification } from '../../components/Notification/Notification';

export const NotFoundPage: FC = () => {
  return (
    <Notification message="You have reached the wrong page" />
  );
};
