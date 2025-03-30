import { Pagination, Stack } from '@mui/material';
import styles from './PaginationBlock.module.scss';
import './Pagination.css';

type Props = {
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: string;
  paginationLength: number;
};

const PaginationBlock: React.FC<Props> = ({
  handlePageChange,
  page,
  paginationLength,
}) => {
  return (
    <div className={styles.pagination}>
      <Stack spacing={2}>
        <Pagination
          count={paginationLength}
          variant="outlined"
          shape="rounded"
          page={+page}
          onChange={handlePageChange}
          // className={styles.customPagination} // Додаємо клас
        />
      </Stack>
    </div>
  );
};

export default PaginationBlock;
