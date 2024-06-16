import React, { Dispatch, SetStateAction } from 'react';
import { Navigation } from '../Navigation';
import { Tools } from '../Tools';
import classNames from 'classnames';
import styles from './HeaderTools.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const HeaderTools: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  return (
    <div
      className={classNames(styles.header__info, {
        [styles.header_tools__info_open]: isOpen,
      })}
    >
      <Navigation setIsOpen={setIsOpen} />
      <Tools setIsOpen={setIsOpen} />
    </div>
  );
};
