import React from 'react';
import styles from './CatalogPagination.module.scss';

import { useNavigate, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { SearchParam } from '../../../../../../../enums/SearchFields';
import { getPageRange } from '../../../../../../../helpers/getPaginationPages';
import { getSearchWith } from '../../../../../../../helpers/searchHelper';
import { ArrowButton } from '../../../../../atoms/ArrowButton';
import { IconButton } from '../../../../../atoms/IconButton';
import { Typography } from '../../../../../atoms/Typography';

type Props = {
  currentPage: number;
  totalPages: number;
};

export const CatalogPagination: React.FC<Props> = ({
  currentPage,
  totalPages,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (newPage: number) => {
    if (newPage === currentPage) {
      return;
    }

    const updatedSearch = getSearchWith(searchParams, {
      [SearchParam.Page]: newPage.toString(),
    });

    navigate({ search: updatedSearch });
  };

  const range = getPageRange(currentPage, totalPages, 4);

  return (
    <div className={styles.container}>
      <ArrowButton
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.container__arrow}
        direction="left"
      />
      <div className={styles.container__pages}>
        {range.map(page => (
          <IconButton
            key={page}
            onClick={() => handlePageClick(page)}
            className={classNames(styles.container__page, {
              [styles['container__page--active']]: page === currentPage,
            })}
          >
            <Typography
              variant="buttons"
              className={styles['container__page-text']}
            >
              {page}
            </Typography>
          </IconButton>
        ))}
      </div>
      <ArrowButton
        onClick={() => handlePageClick(currentPage + 1)}
        className={styles.container__arrow}
        disabled={currentPage === totalPages}
        direction="right"
      />
    </div>
  );
};
