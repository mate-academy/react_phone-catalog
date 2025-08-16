import { Stack, Pagination } from '@mui/material';

type Props = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export const CustomPagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        siblingCount={1}
      />
    </Stack>
  );
};
