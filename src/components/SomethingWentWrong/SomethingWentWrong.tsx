import { wentWrong } from '../../helpers/constants';
import './SomethingWentWrong.scss';

export const SomethingWentWrong = () => {
  const handlecClick = () => {
    window.location.reload();
  };

  return (
    <div className="something-went-wrong">

      <img
        src={wentWrong}
        alt=""
        className="something-went-wrong__image"
      />

      <div className="something-went-wrong__text-container">
        <h1 className="something-went-wrong__title title">
          Oops, something went wrong
        </h1>

        <p className="something-went-wrong__text">
          We’re working on getting things back on track.
          Please refresh the page or try again later.
        </p>
      </div>

      <button
        className="button-main something-went-wrong__button"
        type="button"
        aria-label="reload"
        onClick={handlecClick}
      >
        Refresh page
      </button>
    </div>
  );
};
