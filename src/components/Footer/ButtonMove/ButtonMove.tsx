import { moveToTop } from '../../../helpers/moveToTop';
import './ButtonMove.scss';

const ButtonMove = () => (
  <div className="button-move">
    <span className="button-move__name">
      Back to top
    </span>

    <button
      type="button"
      className="button-block"
      onClick={moveToTop}
    >
      <img src="./icons/up.svg" alt="icon" />
    </button>
  </div>
);

export default ButtonMove;
