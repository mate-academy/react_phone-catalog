import classNames from 'classnames';
import styles from './PaginationNavigation.module.scss';
import { useCallback, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ItemsOnPageType } from '../../types/ItemsOnPageType';
import useEmblaCarousel from 'embla-carousel-react';

interface ScrollToProps {
  index: number;
}

const getTotalPages = (total: number, perPage: ItemsOnPageType) => {
  if (perPage === 'all') {
    return 1;
  } else {
    return Math.ceil(total / +perPage);
  }
};

export const PaginationNavigation = () => {
  const { products, currentPage, perPage, handleSetCurrentPage } =
    useContext(AppContext)!;
  const totalPages = getTotalPages(products.length, perPage);

  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const ScrollTo = useCallback(
    ({ index }: ScrollToProps) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  const handleLeftButton = () => {
    if (currentPage !== 1) {
      handleSetCurrentPage(currentPage - 1);
      scrollPrev();
    }
  };

  const handleRightButton = () => {
    if (currentPage !== totalPages) {
      handleSetCurrentPage(currentPage + 1);
      scrollNext();
    }
  };

  const handlePageButton = (index: number) => {
    handleSetCurrentPage(index + 1);
    ScrollTo({ index: index });
  };

  return (
    <div className={styles.pagination__buttonSection}>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__navigationButton,
          styles.pagination__navigationButtonLeft,
          {
            [styles.pagination__navigationButtonDisabled]: currentPage === 1,
          },
        )}
        onClick={handleLeftButton}
      ></button>

      <div className={styles.pagination__listButtonsContainer} ref={emblaRef}>
        <div className={styles.pagination__slider}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              className={classNames(
                styles.pagination__button,
                styles.pagination__listButton,
                {
                  [styles.pagination__listButtonActive]:
                    index + 1 === currentPage,
                },
              )}
              onClick={() => handlePageButton(index)}
              key={index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__navigationButton,
          styles.pagination__navigationButtonRight,
          {
            [styles.pagination__navigationButtonDisabled]:
              currentPage === totalPages,
          },
        )}
        onClick={handleRightButton}
      ></button>
    </div>
  );
};
