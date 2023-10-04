/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { ButtonType } from 'types';
import './Button.scss';

type Props = {
  buttonType: ButtonType,
  onClickHandler?: () => void,
  existInCart?: boolean,
  disabled?: boolean,
};

export const Button: React.FC<Props> = ({
  buttonType,
  onClickHandler,
  existInCart,
  disabled,
}) => (
  <button
    type="button"
    onClick={onClickHandler}
    disabled={disabled}
    className={classNames('button', `button--${buttonType}`, {
      'button--added': existInCart,
    })}
  />
);
