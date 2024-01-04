import React from 'react';
import './Line.scss';
import classNames from 'classnames';

type Props = {
  hidden?: boolean;
  revert?: boolean;
};

export const Line: React.FC<Props> = ({ hidden, revert }) => (
  <div className={classNames('line', {
    'line--hidden': hidden,
    'line--revert': revert,
  })}
  />
);
