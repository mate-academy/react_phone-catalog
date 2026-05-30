import React, { useMemo } from 'react';
import styles from './Pagination.module.scss';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams';
import { SearchLabelsType } from '../../types/SearchLabelsType';

interface Props {
  items: number;
  itemsOnPage: number;
  activePage: number;
  searchLabel: SearchLabelsType;
}

export const Pagination = ({ items, itemsOnPage, activePage }: Props) => {
  const updateSearch = useUpdateSearchParams();
  const allPages = Math.ceil(items / itemsOnPage);

  const pages: (string | number)[] = useMemo(() => {
    const resultPages = [];

    for (let i = 1; i <= allPages; i++) {
      if (activePage < 5 && i <= 5) {
        resultPages.push(i);
        continue;
      }

      if (activePage > allPages - 4 && i >= allPages - 4) {
        resultPages.push(i);
        continue;
      }

      if (
        activePage - 1 === i ||
        activePage === i ||
        activePage + 1 === i ||
        i === 1 ||
        i === allPages
      ) {
        if (allPages === i && allPages - 3 > activePage) {
          resultPages.push('...');
        }

        resultPages.push(i);

        if (1 === i && 5 <= activePage) {
          resultPages.push('...');
        }
      }
    }

    return resultPages;
  }, [activePage, allPages]);

  return (
    <div className={styles.pagination}>
      <Button
        icon={ButtonType.Left}
        isRatio={true}
        disabled={activePage === 1}
        isDisabled={activePage === 1}
        onClick={() => {
          const prevPage = activePage - 1;

          if (prevPage !== 1) {
            updateSearch({ page: prevPage.toString() });
          } else {
            updateSearch({ page: null });
          }
        }}
      />
      <div className={styles.pagination__pages}>
        {pages.map((currentPage, i) => (
          <Button
            key={i}
            className="body-text"
            isRatio
            isPage
            disabled={typeof currentPage !== 'number'}
            isDisabled={typeof currentPage !== 'number'}
            isSelected={activePage === currentPage}
            onClick={() => {
              if (typeof currentPage === 'number' && currentPage !== 1) {
                updateSearch({ page: currentPage.toString() });
              } else {
                updateSearch({ page: null });
              }
            }}
          >
            {currentPage}
          </Button>
        ))}
      </div>
      <Button
        icon={ButtonType.Right}
        isRatio={true}
        disabled={activePage === allPages}
        isDisabled={activePage === allPages}
        onClick={() => {
          const nextPage = activePage + 1;

          updateSearch({ page: nextPage.toString() });
        }}
      ></Button>
    </div>
  );
};
