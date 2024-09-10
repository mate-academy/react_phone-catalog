import { setScrollToTop } from '../../features/scroll/scrollSlice';

import { useAppDispatch } from '../../hooks.ts';

import { Button } from '../Button/Button.tsx';

const additionalStyles = {
  backgroundColor: '#313237',
  color: '#FFFFFF',
  borderColor: '#313237',
};

type Props = {
  currentPage: number;
  pageNumber: number | string;
  onPageChange: (page: number) => void;
};

export const PaginationPageButton = ({
  currentPage,
  pageNumber,
  onPageChange,
}: Props) => {
  const dispatch = useAppDispatch();

  const isCurrentPage = pageNumber === currentPage;
  const buttonAddStyles = isCurrentPage ? additionalStyles : {};

  const handleButtonClick = (page: number) => {
    onPageChange(page);
    dispatch(setScrollToTop('auto'));
  };

  return (
    <Button
      pageNumber={pageNumber}
      disabled={typeof pageNumber === 'string'}
      action={() =>
        typeof pageNumber === 'number' && handleButtonClick(pageNumber)
      }
      additionalStyles={buttonAddStyles}
    />
  );
};
