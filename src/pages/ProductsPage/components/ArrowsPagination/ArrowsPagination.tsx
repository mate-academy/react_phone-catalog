import styles from './ArrowsPagination.module.scss';
import { Icon } from '../../../../components/Icon';
import { IconType } from '../../../../types/IconTypes';

type Props = {
  iconType: IconType;
  disabled?: boolean;
  onClick: () => void;
};

export const ArrowsPagination = ({
  iconType,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      className={`${styles.btns} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon type={iconType} />
    </button>
  );
};