import classNames from 'classnames';
import { PrevArrowIcon } from 'src/components/Icons/PrevArrowIcon';

export const PreviousButton = () => {
  return (
    <button
      type="button"
      className={classNames(
        'pagination__button-prev',
        'pagination__button',
        // { 'pagination__button--disabled': isPrevButtonDisabled },
      )}
      // onClick={handlePrevButtonClick}
    >
      <PrevArrowIcon />
    </button>
  );
};
