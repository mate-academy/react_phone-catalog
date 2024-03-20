import { wentWrong } from '../../helpers/constants';
import './SomethingWentWrong.scss';

export const SomethingWentWrong = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="something-went-wrong">
      <img src={wentWrong} alt="" className="something-went-wrong__image" />

      <div className="something-went-wrong__text-container">
        <h1 className="something-went-wrong__title title">
          Houston, we have a problem
        </h1>

        <p className="something-went-wrong__text">
          Something in universe went wrong. Please, refresh or try again later
        </p>
      </div>

      <button
        className="button-main something-went-wrong__button"
        type="button"
        aria-label="reload"
        onClick={handleClick}
      >
        Refresh
      </button>
    </div>
  );
};
