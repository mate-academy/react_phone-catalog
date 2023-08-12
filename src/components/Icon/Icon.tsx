import { FC } from 'react';
import classNames from 'classnames';

import './Icon.scss';

type Props = {
  type: string,
};

export const Icon: FC<Props> = ({ type }) => {
  return (
    <span className={classNames(
      'icon',
      `icon--${type}`,
    )}
    />
  );
};
