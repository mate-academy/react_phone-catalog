import { FC } from 'react';
import '../PaginationButton/PaginationButton.scss';

interface Props {
  children: string;
  page: string;
  handlePageChange: (par: string) => void;
  amountOfButtons: number,
}

export const PaginationSideButton: FC<Props> = ({
  children,
  page,
  handlePageChange,
  amountOfButtons,
}) => {
  const rightHandleChange = () => {
    if (+page < amountOfButtons) {
      handlePageChange(String(+page + 1));
    } else {
      handlePageChange('1');
    }
  };

  const lefttHandleChange = () => {
    if (+page > 1) {
      handlePageChange(String(+page - 1));
    } else {
      handlePageChange(`${amountOfButtons}`);
    }
  };

  return (
    <button
      onClick={children === '>' ? rightHandleChange : lefttHandleChange}
      type="button"
      className="pagination-button pagination-button--side"
    >
      {children}
    </button>
  );
};
