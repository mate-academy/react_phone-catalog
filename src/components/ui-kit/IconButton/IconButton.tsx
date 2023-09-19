/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { IconButtonType } from 'types';
import './IconButton.scss';

type Props = {
  type: IconButtonType,
  onClickHandler?: () => void,
  disabled?: boolean,
};

export const IconButton: React.FC<Props> = ({
  type,
  disabled,
  onClickHandler,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClickHandler}
    className={classNames('icon-button', `icon-button--${type}`)}
  />
);
