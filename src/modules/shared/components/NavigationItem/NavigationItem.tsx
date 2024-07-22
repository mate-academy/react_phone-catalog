import classNames from 'classnames';
import styles from './NavigationItem.module.scss';

type Props = {
  title: string;
};

export const NavigationItem: React.FC<Props> = ({ title }) => {
  return (
    <li
      className={classNames(
        styles.NavigationItem,
        styles.NavigationItem_active,
      )}
    >
      <a className={styles.Link} href="#">
        {title}
      </a>
    </li>
  );
};
