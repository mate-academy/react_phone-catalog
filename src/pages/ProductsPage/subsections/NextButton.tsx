import classNames from 'classnames';
import { NextArrowIcon } from 'src/components/Icons/NextArrowIcon';

export const NextButton = () => {
  return (
    <button
      type="button"
      data-cy="paginationRight"
      className={classNames(
        'pagination__button-next',
        'pagination__button',
      )}
    >
      <NextArrowIcon />
    </button>
  );
};
