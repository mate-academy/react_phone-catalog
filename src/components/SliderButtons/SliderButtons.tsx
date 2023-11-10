import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import './SliderButtons.scss';

type Props = {
  prevPage: () => void;
  nextPage: () => void;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
};

/* eslint-disable */

export const SliderButtons: React.FC<Props> = ({
  isLeftDisabled, isRightDisabled, prevPage, nextPage,
}) => {
  return (
    <div className="slider__buttons">
      <button
        type="button"
        className={classNames(
          "slider__button",
        )}
        onClick={prevPage}
        disabled={isLeftDisabled}
      >
        <ReactSVG
          src="img/icons/Chevron (Arrow Left).svg"
        />
      </button>

      <button
        type="button"
        className={classNames(
          "slider__button",
        )}
        disabled={isRightDisabled}
        onClick={nextPage}
      >
        <ReactSVG
          src="img/icons/Chevron (Arrow Right).svg"
        />
      </button>
    </div>
  );
};
