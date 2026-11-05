import classNames from 'classnames';

import { Icon } from '../Icon/Icon';

import styles from './IconWithCounter.module.scss';

type Props = {
  icon: string;
  quantity: number;
  className?: string;
};

type CounterStyle = React.CSSProperties & {
  '--quantity': string;
};

export const IconWithCounter = ({ icon, quantity, className }: Props) => {
  const displayQuantity = Math.min(Math.max(0, quantity), 99);

  const iconStyle: CounterStyle = {
    '--quantity': `"${displayQuantity}"`,
  };

  return (
    <Icon
      icon={icon}
      className={classNames(styles.counter, className)}
      style={iconStyle}
    />
  );
};
