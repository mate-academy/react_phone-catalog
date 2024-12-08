import React, { useMemo } from 'react';

import cn from 'classnames';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';
import RightIcon from '@assets/images/icons/chevron-right-icon.svg?react';

import { Box } from '@shared/base/Box';
import { IconButton } from '@shared/base/IconButton';
import { useMedia } from '@shared/hooks/useMedia';
import { DefaultProps } from '@shared/types/common';

import { usePagination, UsePaginationProps } from './hooks/usePagination';
import styles from './Pagination.module.scss';
import {
  MAX_PAGES_DESKTOP,
  MAX_PAGES_MOBILE,
  MAX_PAGES_TABLET,
} from './utils/constants';

interface PaginationProps extends DefaultProps, UsePaginationProps {}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  className,
  totalPages,
  ...rest
}) => {
  const { isDesktop, isTablet } = useMedia();

  const maxRange = useMemo(() => {
    if (isDesktop) {
      return MAX_PAGES_DESKTOP;
    }

    if (isTablet) {
      return MAX_PAGES_TABLET;
    }

    return MAX_PAGES_MOBILE;
  }, [isDesktop, isTablet]);

  const { paginationRange, onNextPage, onPageChange, onPrevPage } =
    usePagination({ page, totalPages, maxRange });

  if (!page || page === 'all') {
    return null;
  }

  return (
    <Box className={cn(styles.pagination, className)} {...rest}>
      <IconButton Icon={LeftIcon} disabled={page === 1} onClick={onPrevPage} />

      <Box className={styles.pages}>
        {paginationRange.map((item, idx) => {
          if (item === '...') {
            return <React.Fragment key={idx}>{item}</React.Fragment>;
          }

          return (
            <IconButton
              key={idx}
              Icon={() => <>{item}</>}
              selected={item === page}
              onClick={() => onPageChange(item)}
            />
          );
        })}
      </Box>

      <IconButton
        Icon={RightIcon}
        disabled={page === totalPages}
        onClick={onNextPage}
      />
    </Box>
  );
};
