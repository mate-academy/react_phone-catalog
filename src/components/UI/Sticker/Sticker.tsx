import React, { FC } from 'react';

import './sticker.scss';
import classNames from 'classnames';

type Props = {
  className: string,
  num: number,
};

export const Sticker: FC<Props> = React.memo(({ className, num }) => {
  return (
    <span className={classNames(
      className,
      'sticker',
    )}
    >
      {num}
    </span>
  );
});
