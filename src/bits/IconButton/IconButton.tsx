/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import './IconButton.scss';
import { IconButtonType } from '../../types';

type Props = {
  type: IconButtonType,
  handler?: () => void,
  disabled?: boolean,
};

export const IconButton: React.FC<Props> = ({
  type,
  disabled,
  handler,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={handler}
    className={classNames('icon-button', `icon-button--${type}`)}
  />
);
