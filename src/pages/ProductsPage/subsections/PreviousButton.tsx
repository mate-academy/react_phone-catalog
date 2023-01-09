import classNames from 'classnames';
import { PrevArrowIcon } from 'src/components/Icons/PrevArrowIcon';

export const PreviousButton = () => {
  return (
    <button
      type="button"
      data-cy="paginationLeft"
      className={classNames(
        'pagination__button-prev',
        'pagination__button',
      )}
    >
      <PrevArrowIcon />
    </button>
  );
};
