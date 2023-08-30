import { FC } from 'react';

import './Icon.scss';

type Props = {
  type: string,
};

export const Icon: FC<Props> = ({ type }) => {
  return (
    <span
      className={`icon icon--${type}`}
      aria-label={`${type} icon`}
    />
  );
};
