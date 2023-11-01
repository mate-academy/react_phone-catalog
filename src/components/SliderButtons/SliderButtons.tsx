import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import './SliderButtons.scss';

type Props = {
  changePage: (page: number) => void;
  current: number;
};

/* eslint-disable */

export const SliderButtons: React.FC<Props> = ({ changePage, current }) => {
  return (
    <div className="slider-buttons">
      <button
        type="button"
        className={classNames(
          "slider-button",
          { 'slider-button--active': current !== 0 }
        )}
        onClick={() => changePage(current - 1)}
        disabled={current === 0}
      >
        <ReactSVG
          src="img/icons/Chevron (Arrow Left).svg"
        />
      </button>

      <button
        type="button"
        className={classNames(
          "slider-button",
          { 'slider-button--active': current !== 4 }
        )}
        disabled={current === 4}
        onClick={() => changePage(current + 1)}
      >
        <ReactSVG
          src="img/icons/Chevron (Arrow Right).svg"
        />
      </button>
    </div>
  );
};
