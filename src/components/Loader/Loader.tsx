import classNames from 'classnames';
import React from 'react';
import { Props } from './Props';

export const Loader: React.FC<Props> = React.memo(({ id, isProcessing }) => (
  <div className={classNames('modal overlay',
    { 'is-active': isProcessing(id) })}
  >
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
));
