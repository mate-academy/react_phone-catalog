import classNames from 'classnames';
import './MyButton.scss';

type Props = {
  children: React.ReactNode;
  handleClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
};

export const MyButton: React.FC<Props> = ({
  children,
  handleClick,
  disabled = false,
  isSelected = false,
}) => {
  return (
    <button
      type="button"
      className={classNames('my-button', {
        'my-button--selected': isSelected,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
