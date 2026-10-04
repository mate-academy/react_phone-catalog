import { Button } from '../Button';
import styles from './Pagination.module.scss';
import { PaginationItem } from './PaginationItem';
import { getPages } from '@/shared/utils/getPages';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <ul className={styles.pagination}>
      <li className={styles.item}>
        <Button
          icon="icons/left.svg"
          alt="prev"
          style={{ marginRight: '5px' }}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
      </li>

      {pages.map((element, index) => {
        if (element === '...') {
          return <span key={`dots-${index}`}>...</span>;
        }

        return (
          <PaginationItem
            key={`page-${element}-${index}`}
            element={element}
            currentPage={currentPage}
            onClick={() => onPageChange(element)}
          />
        );
      })}

      <li className={styles.item}>
        <Button
          icon="icons/right.svg"
          alt="next"
          style={{ marginLeft: '5px' }}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </li>
    </ul>
  );
};
