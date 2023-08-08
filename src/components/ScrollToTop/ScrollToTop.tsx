import { goToTop } from '../../helpers/goToTop';
import './style.scss';

export const ScrollToTop = () => (
  <div className="backToTop">
    {' '}
    <button
      type="button"
      className="backToTop__icon"
      aria-label="Back to top"
      onClick={goToTop}
    />
  </div>
);
