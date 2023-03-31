import { FC } from 'react';

type Props = {
  message: string,
};

export const NoResult: FC<Props> = ({ message }) => {
  return (
    <div className="noResult">
      <h1>{message}</h1>
    </div>
  );
};
