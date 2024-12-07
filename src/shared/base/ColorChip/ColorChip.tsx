import cn from 'classnames';

import { DefaultProps } from '@shared/types/common';

import styles from './ColorChip.module.scss';
import { Box } from '../Box';

export interface ColorChipProps extends DefaultProps {
  color: string;
  selected?: boolean;
  onClick?: (color: string) => void;
}

export const ColorChip: React.FC<ColorChipProps> = ({
  color,
  className,
  selected,
  onClick,
  ...rest
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(color);
    }
  };

  return (
    <Box
      onClick={handleClick}
      className={cn(styles.chip, className, {
        [styles.selected]: selected,
      })}
      {...rest}
    >
      <Box className={styles.circle} style={{ backgroundColor: color }} />
    </Box>
  );
};
