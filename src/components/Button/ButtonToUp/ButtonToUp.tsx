import { handleBackToTop } from '../../../helpers/handleToUp';
import './ButtonToUp.scss';

export const ButtonToUp = () => {
  return (
    <button
      className="button-to-up"
      type="button"
      onClick={handleBackToTop}
    >
      Back to top
      <div className="button-to-up--arrow" />
    </button>
  );
};
