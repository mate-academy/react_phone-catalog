import { Box } from '@shared/base/Box';

import styles from './PageSkeleton.module.scss';
import { Skeleton } from '../Skeleton';

export const PageSkeleton = () => (
  <Box className={styles.skeleton}>
    <Box className="container">
      <Skeleton
        direction="column"
        gap={16}
        quantity={8}
        height={50}
        className={styles.content}
      />
    </Box>
  </Box>
);
