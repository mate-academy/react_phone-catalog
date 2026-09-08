import { productColor } from '@/constants/productColor';
import { Button } from '@/modules/shared/components/Button';
import { FC, MouseEvent } from 'react';

import styles from './ColorButton.module.scss';
import classNames from 'classnames';
import { normilizeColor } from '@/helpers/productHelpers';

interface Props {
  to: string;
  isSelected: boolean;
  color: string;
}

export const ColorButton: FC<Props> = ({ color, isSelected, to }) => {
  const normilizedColor = normilizeColor(color);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isSelected) {
      e.preventDefault();
    }
  };

  return (
    <Button
      to={to}
      size="small"
      squareBtn
      variant="outline"
      className={classNames(styles.btn, {
        [styles.selected]: isSelected,
      })}
      onClick={handleClick}
      startIcon={
        <div
          className={styles.colorIcon}
          style={{ backgroundColor: productColor[normilizedColor] }}
        ></div>
      }
    />
  );
};
