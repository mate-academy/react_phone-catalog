import classNames from 'classnames';
import styles from './DecorativeLine.module.scss';

type Props = {
  className?: string;
};

export const DecorativeLine: React.FC<Props> = ({ className }) => (
  <div className={classNames(styles.DecorativeLine, className)} />
);
