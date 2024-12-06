// eslint-disable-next-line import/no-extraneous-dependencies
import { Oval } from 'react-loader-spinner';

import styles from './Loader.module.scss';
import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
  return (
    <Oval
      width={200}
      height={200}
      wrapperClass={classNames(styles.loader, className)}
    />
  );
};
