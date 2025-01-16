import classNames from 'classnames';
import styles from './PaginationButton.module.scss';

type HandlePageChange = (page: number) => void;

type Props = {
  page: number;
  chosenPage: number;
  onPageChange: HandlePageChange;
};

export const PaginationButton: React.FC<Props> = ({
  page,
  chosenPage,
  onPageChange,
}) => {
  const isActive = page === chosenPage;

  return (
    <button
      type="button"
      disabled={isActive}
      onClick={() => onPageChange(page)}
      className={classNames(
        styles.PageButton,
        isActive && styles.PageButton_active,
      )}
    >
      {page}
    </button>
  );
};
