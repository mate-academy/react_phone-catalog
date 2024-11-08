import { FC } from 'react';

import { getColorHex } from '@utils/helpers/getColorHex';
import { ColorNames } from '@utils/types/colorNames.type';

import styles from './OptionContent.module.scss';

type TProps = { isColor: boolean | undefined; option: string };

export const OptionContent: FC<TProps> = ({ isColor, option }) =>
  isColor ? (
    <span
      className={styles.bgColor}
      style={{
        backgroundColor: `${getColorHex(option as ColorNames)}`,
      }}
    />
  ) : (
    option
  );
