import { useEffect, useMemo } from 'react';
import { IconButton } from '../../../shared/components/IconButton';
import styles from './Pagination.module.scss';
import { useSlider } from '../../../../_hooks/useSlider';
import { SearchLink } from '../../../shared/components/SearchLink';

type Props = {
  itemCount: number;
  maxPagesCount: number;
  perPage: number | null;
  activePage: number;
};

export const Pagination: React.FC<Props> = ({
  itemCount,
  maxPagesCount,
  perPage,
  activePage,
}) => {
  const totalPages = perPage ? Math.ceil(itemCount / perPage) : 1;
  const visiblePagesCount = Math.min(maxPagesCount, totalPages);

  const { currentIndex, handlePrev, handleNext, goToIndex } = useSlider({
    itemCount: totalPages,
  });

  const visiblePages = useMemo(() => {
    const pages: number[] = [];

    for (let i = 0; i < visiblePagesCount; i++) {
      pages.push(((currentIndex + i) % totalPages) + 1);
    }

    return pages;
  }, [currentIndex, totalPages, visiblePagesCount]);

  useEffect(() => {
    goToIndex(0);
  }, [itemCount, maxPagesCount, perPage, goToIndex]);

  return (
    <section className={styles.pagination}>
      <IconButton
        onClick={handlePrev}
        modificator={'arrow'}
        direction={'left'}
        disabled={currentIndex === 0}
      />
      <ul className={styles.pagination__list}>
        {visiblePages.map(pageItem => (
          <li key={pageItem} className={styles.pagination__item}>
            <SearchLink
              params={{ page: pageItem === 1 ? null : `${pageItem}` }}
            >
              <IconButton
                modificator={'pagination'}
                value={pageItem}
                selected={activePage === pageItem}
              />
            </SearchLink>
          </li>
        ))}
      </ul>
      <IconButton
        onClick={handleNext}
        modificator={'arrow'}
        disabled={currentIndex + visiblePagesCount === totalPages}
      />
    </section>
  );
};
