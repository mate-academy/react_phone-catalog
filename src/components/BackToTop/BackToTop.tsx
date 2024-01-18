import { goTop } from '../../helpers/goTop';
import { ButtonMove } from '../ButtonMove';
import './BackToTop.scss';

export const BackToTop = () => {
  return (
    <button
      className="back-to-top"
      type="button"
      onClick={goTop}
    >

      <p className="back-to-top__message">
        Back to top
      </p>

      <ButtonMove icon="top" />
    </button>
  );
};
