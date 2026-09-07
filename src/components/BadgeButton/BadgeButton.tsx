import styles from './BadgeButton.module.scss';
import { ReactNode } from 'react';
import cn from 'classnames';
import { IconButton } from 'components/IconButton';
import useCheckMediaQuery from 'hooks/useCheckMediaQuery';

type BadgeButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
  useBorder?: boolean;
  isSelected?: boolean;
  amount?: number;
  height?: string;
  width?: string;
};

export const BadgeButton = ({
  icon,
  onClick,
  isSelected,
  amount,
  useBorder = false,
  height = '64px',
  width = '64px',
}: BadgeButtonProps) => {
  const { isTablet, isMobile } = useCheckMediaQuery();

  const getResponsiveBadgePosition = () => {
    if (isMobile) {
      return {
        width: '16px',
        height: '16px',
        right: '100px',
        top: '10px',
      };
    }

    if (isTablet) {
      return {
        width: '16px',
        height: '16px',
        top: '6px',
        right: '10px',
      };
    }

    return undefined;
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.container__selected]: isSelected,
      })}
    >
      <div className={styles.container__button}>
        <IconButton
          icon={icon}
          height={height}
          width={width}
          useBorder={useBorder}
          borderColor={'#E2E6E9'}
          onClick={onClick}
        />
      </div>
      {!!amount && (
        <div
          className={styles.container__badge}
          style={getResponsiveBadgePosition()}
        >
          <span>{amount}</span>
        </div>
      )}
    </div>
  );
};
