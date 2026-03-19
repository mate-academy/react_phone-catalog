import { Icon } from '../../Icon';
import { IconName } from '../../../constants/icons';
import classNames from 'classnames';
import style from './RoundButton.module.scss';

type Props = {
  onClick: () => void;
  iconName: IconName;
  ariaLabel: string;
  disabled?: boolean;
};

export const RoundButton: React.FC<Props> = ({
  onClick,
  iconName,
  ariaLabel,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={classNames(style.arrow, { [style.disabled]: disabled })}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon name={iconName} />
    </button>
  );
};
