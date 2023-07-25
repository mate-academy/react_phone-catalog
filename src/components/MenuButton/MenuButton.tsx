import classNames from 'classnames';

type Props = {
  isOpened: boolean,
  onClick: () => void,
};

export const MenuButton: React.FC<Props> = ({ isOpened, onClick }) => (
  <button
    className="
      top-actions__link
      top-actions__link--button"
    type="button"
    onClick={onClick}
  >
    <span
      className={classNames(
        'icon',
        {
          icon__menu: !isOpened,
          icon__cross: isOpened,
        },
      )}
    />
  </button>
);
