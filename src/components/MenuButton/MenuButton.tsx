import classNames from 'classnames';
import './MenuButton.scss';

type Props = {
  isOpened: boolean;
  onClick: (status: boolean) => void;
};

export const MenuButton: React.FC<Props> = ({ isOpened, onClick }) => (
  <button
    className="
      top-actions__link
      top-actions__link--button"
    type="button"
    onClick={() => onClick(!isOpened)}
  >
    <span
      className={classNames(
        'icon',
        'icon__menu',
        { 'icon__menu-burger': !isOpened },
        { icon__cross: isOpened },
      )}
    />
  </button>
);
