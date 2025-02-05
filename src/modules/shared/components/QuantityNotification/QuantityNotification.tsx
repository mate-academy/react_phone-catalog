import classNames from 'classnames';
import styles from './QuantityNotification.module.scss';

type Props = {
  quantity: number;
  className?: string;
};

export const QuantityNotification: React.FC<Props> = ({
  quantity,
  className,
}) => {
  return (
    <output className={classNames(styles.QuantityNotification, className)}>
      {quantity}
    </output>
  );
};
