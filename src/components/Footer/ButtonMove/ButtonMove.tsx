import './ButtonMove.scss';
import { moveToTop } from '../../../helpers/moveToTop';

const ButtonMove = () => (
  <div className="button-move">
    <span className="button-move__name">
      Back to top
    </span>

    <button
      type="button"
      className="button-move__button"
      onClick={moveToTop}
    >
      <img src="./icons/up.svg" alt="icon" />
    </button>
  </div>
);

export default ButtonMove;
