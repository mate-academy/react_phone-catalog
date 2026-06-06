import { HTMLAttributes, useMemo } from 'react';
import { ButtonFirst } from '../ButtonFirst/ButtonFirst';
import { ButtonSecond } from '../ButtonSecond/ButtonSecond';
import styles from './styles.module.scss';

// type Case = 'borderCaseStart' | 'Number' | 'Selected' | 'borderCaseEnd';
// type PaginationType = { number: number; case: Case };
// const paginationCase = useMemo(() => {
//   const result: PaginationType[] = [];
//   Array.from({ length: maxLenght }).forEach((_, index) => {
//     const currentIndex = index + 1;
//     if (maxLenght > 4 + neigbort * 2) {
//       console.log('more');
//       const borderClamp = Math.min(Math.max(selected, 2 + neigbort), maxLenght - 1 - neigbort);
//       if (currentIndex === 1 || currentIndex === maxLenght) {
//         result.push({
//           number: currentIndex,
//           case: currentIndex === selected ? 'Selected' : 'Number',
//         });
//         return;
//       }
//       if (
//         currentIndex > borderClamp - (neigbort + 1) &&
//         currentIndex < borderClamp + (neigbort + 1)
//       ) {
//         let casePagination: Case = currentIndex === selected ? 'Selected' : 'Number';
//         if (currentIndex === borderClamp - neigbort && currentIndex > neigbort) {
//           casePagination = 'borderCaseStart';
//         } else if (currentIndex === borderClamp + neigbort && currentIndex < maxLenght - 1) {
//           casePagination = 'borderCaseEnd';
//         }
//         result.push({ number: currentIndex, case: casePagination });
//         return;
//       }
//     } else {
//       console.log('hhh');
//       result.push({
//         number: currentIndex,
//         case: currentIndex === selected ? 'Selected' : 'Number',
//       });
//     }
//   });
//   return result;
// }, [selected, maxLenght, neigbort]);

type PaginationItem =
  | {
      type: 'page';
      page: number;
      selected: boolean;
    }
  | {
      type: 'ellipsis';
      position: 'start' | 'end';
      page: number;
    };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);

const createPagination = (
  totalPages: number,
  selectedPage: number,
  siblingCount = 2,
): PaginationItem[] => {
  if (totalPages <= 0) {
    return [];
  }

  const currentPage = clamp(selectedPage, 1, totalPages);
  const normalizedSiblingCount = Math.max(0, siblingCount);

  const createPage = (page: number): PaginationItem => ({
    type: 'page',
    page,
    selected: page === currentPage,
  });

  // Первая и последняя страницы, соседи и возможные многоточия.
  const maxVisibleItems = normalizedSiblingCount * 2 + 3;

  if (totalPages <= maxVisibleItems) {
    return range(1, totalPages).map(createPage);
  }

  let start = Math.max(2, currentPage - normalizedSiblingCount);
  let end = Math.min(totalPages - 1, currentPage + normalizedSiblingCount);

  const middleWindowSize = normalizedSiblingCount * 2;

  if (start === 2) {
    end = Math.min(totalPages - 1, start + middleWindowSize);
  }

  if (end === totalPages - 1) {
    start = Math.max(2, end - middleWindowSize);
  }

  const visiblePages = [1, ...range(start, end), totalPages];
  const result: PaginationItem[] = [];

  for (const page of visiblePages) {
    if ((start > 2 && page === start) || (page === end && end < totalPages - 1)) {
      result.push({
        type: 'ellipsis',
        position: page === 1 ? 'start' : 'end',
        page: page,
      });
    } else {
      result.push(createPage(page));
    }
  }
  return result;
};

export const Pagination = ({
  selected,
  onSelected,
  maxLength,
  neigbort = 2,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  maxLength: number;
  selected: number;
  neigbort?: number;
  onSelected: (value: number) => void;
}) => {
  const paginationItems = useMemo(
    () => createPagination(maxLength, selected, neigbort),
    [maxLength, selected, neigbort],
  );

  return (
    <div {...props}>
      <div aria-label="pagination" className={styles.pagination}>
        <ButtonSecond
          aria-label="Previous pagination"
          disabled={selected === 1}
          className={styles.buttonArrow}
          rotate={180}
          onClick={() => {
            onSelected(selected - 1);
          }}
        />

        {paginationItems.map((item, index) => {
          return (
            <ButtonFirst
              aria-label={`Button pagination in ${item.page}`}
              key={index}
              selected={item.type === 'page' && item.selected}
              className={styles.buttonNumber}
              onClick={() => {
                onSelected(item.page);
              }}
            >
              {item.type === 'ellipsis' ? '...' : item.page}
            </ButtonFirst>
          );
        })}

        <ButtonSecond
          aria-label="Next pagination"
          disabled={selected === maxLength}
          className={styles.buttonArrow}
          onClick={() => {
            onSelected(selected + 1);
          }}
        />
      </div>
    </div>
  );
};
