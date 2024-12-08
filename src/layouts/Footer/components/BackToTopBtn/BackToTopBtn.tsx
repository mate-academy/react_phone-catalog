import { useCallback } from 'react';

import TopIcon from '@assets/images/icons/chevron-top-icon.svg?react';

import { Box } from '@shared/base/Box';
import { IconButton } from '@shared/base/IconButton';
import { Text } from '@shared/base/Text';

import styles from './BackToTopBtn.module.scss';

export const BackToTopBtn = () => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <Box className={styles.container}>
      <Text variant="small" className={styles.title}>
        Back to top
      </Text>

      <IconButton Icon={TopIcon} onClick={handleClick} />
    </Box>
  );
};
