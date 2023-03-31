import { FC } from 'react';

type Props = {
  message: string,
};

export const Notification: FC<Props> = ({ message }) => (
  <div className="error">
    <h1>{message}</h1>
  </div>
);
