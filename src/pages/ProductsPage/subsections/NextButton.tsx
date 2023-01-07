import classNames from 'classnames';
import { NextArrowIcon } from 'src/components/Icons/NextArrowIcon';

export const NextButton = () => {
  return (
    <button
      type="button"
      className={classNames(
        'pagination__button-next',
        'pagination__button',
        // { 'pagination__button--disabled': isNextButtonDisabled },
      )}
      // onClick={handleNextButtonClick}
    >
      <NextArrowIcon />
    </button>
  );
};
