/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import styles from '../styles/uiSection/optionButtons.module.scss';
import { Colors } from '@shared/types';
import { ColorsToHex } from './dataToUiMappers';

export const getOption = {
  buttonStyle: (
    el: Colors | string,
    isCapacity: boolean,
    active: Colors | string,
  ) => {
    return isCapacity
      ? classNames(styles['capacity-btn'], {
        [styles['capacity-btn-is-active']]: el === active,
      })
      : classNames(styles['color-btn'], {
        [styles['color-btn-is-active']]: el === active,
      });
  },
  colorToHex: (el: Colors | string, isCapacity: boolean) => {
    return !isCapacity
      ? ({ '--bgc': ColorsToHex[el as Colors] } as React.CSSProperties)
      : undefined;
  },
  link: (option: string, link: string[], isCapacity: boolean) => {
    const res = [...link];

    res[2 - +isCapacity] = option.toLowerCase();

    return res.join('-');
  }
};
