import './ButtonBack.scss';
import chevronLeft from '../../images/icons/chevron_arrow_left.svg';

export const ButtonBack = () => {
  return (
    <button
      className="button"
      type="button"
    >
      <img
        src={chevronLeft}
        alt=""
        className="button__icon"
      />
      <span className="button__title button-text">Back</span>
    </button>
  );
};
