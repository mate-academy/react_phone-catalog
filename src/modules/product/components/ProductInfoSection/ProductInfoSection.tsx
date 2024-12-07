import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { DefaultPropsChildren } from '@shared/types/common';

import styles from './ProductInfoSection.module.scss';

interface ProductInfoSectionProps extends DefaultPropsChildren {
  label: string;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  children,
  label,
  className,
  ...rest
}) => (
  <Box className={cn(styles.container, className)} {...rest}>
    <Box className={styles.header}>
      <Text variant="small" className={styles.label}>
        {label}
      </Text>
    </Box>

    {children}
  </Box>
);
