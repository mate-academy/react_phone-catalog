import classNames from 'classnames';
import './ButtonSquare.scss';

type Props = {
  icon: string,
  onAction: () => void,
  isDisabled?: boolean,
};

export const ButtonSquare: React.FC<Props> = ({
  icon,
  onAction,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      className="button-square"
      onClick={onAction}
    >
      <span
        className={classNames(`button-square__icon button-square__icon--${icon}`, {
          'button-square--disabled': isDisabled,
        })}
      />
    </button>
  );
};
