/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react';

import { DSContext } from '../../../../../context/DSContext';
import { LeftArrow } from './components/Arrows/LeftArrow';
import { RightArrow } from './components/Arrows/RightArrow';
import { PageLink } from './components/PageLink';
import styles from './Pagination.module.scss';

interface Props {
  pageNumbers: number[];
}

export const Pagination: React.FC<Props> = ({ pageNumbers }) => {
  const { pageNumber } = useContext(DSContext);

  const getPaginationMarkup = useCallback(() => {
    if (pageNumbers.length > 4) {
      return pageNumbers.map(value => {
        const dots = (
          <div key={`dots-${value}`} className={styles.dots}>
            ...
          </div>
        );

        if (
          (pageNumber === value - 2 && value < pageNumbers.length - 1) ||
          (pageNumber === value + 2 && value > 2)
        ) {
          return dots;
        }

        if (
          (value > pageNumber + 2 && value !== pageNumbers.length) ||
          (value < pageNumber - 2 && value !== 1)
        ) {
          return;
        }

        return <PageLink value={value} key={`number-${value}`} />;
      });
    }

    return pageNumbers.map(value => (
      <PageLink value={value} key={`number-${value}`} />
    ));
  }, [pageNumbers, pageNumber]);

  return (
    <div className={styles.pagination}>
      <LeftArrow />
      <div className={styles.wrapper}>{getPaginationMarkup()}</div>
      <RightArrow pagesLength={pageNumbers.length} />
    </div>
  );
};
