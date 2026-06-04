import styles from './styles.module.scss';
import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

type Props = LinkProps & {
  selected?: boolean;
};

export const ButtonThird = ({ children, selected = false, className, ...props }: Props) => {
  return (
    <Link
      {...props}
      className={classNames(className, styles.button, { [styles.selected]: selected })}
    >
      <div className={styles.wrapper}>{children}</div>
    </Link>
  );
};
