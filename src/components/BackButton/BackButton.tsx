import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import './BackButton.scss';

export const BackButton = () => (
  <button
    className="
      back-button
      grid__item--desktop-1-24"
    type="button"
    data-cy="backButton"
    onClick={() => window.history.back()}
  >
    <Icon
      type={IconType.ARROW_LEFT}
      addClassName="back-button__arrow"
    />

    Back
  </button>
);
