import classNames from 'classnames';
import './IconButton.scss';
import { IconButtonType } from '../../types/enums/IconButtonType';

type Props = {
  type: IconButtonType,
  handler?: () => void,
  disabled?: boolean,
};

export const IconButton: React.FC<Props> = ({
  type,
  disabled,
  handler,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      disabled={disabled}
      onClick={handler}
      className={classNames('icon-button', `icon-button--${type}`)}
    />
  );
};
