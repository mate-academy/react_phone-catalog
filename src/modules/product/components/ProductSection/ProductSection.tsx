import cn from 'classnames';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { DefaultPropsChildren } from '@shared/types/common';

import styles from './ProductSection.module.scss';

export interface ProductSectionProps extends DefaultPropsChildren {
  title: string;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  children,
  className,
  title,
  ...rest
}) => (
  <Box className={cn(styles.container, className)} variant="section" {...rest}>
    <Box className={styles.header}>
      <Text variant="h3">{title}</Text>
    </Box>

    {children}
  </Box>
);
