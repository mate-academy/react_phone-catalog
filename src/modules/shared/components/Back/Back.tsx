import { Link } from 'react-router-dom';
import styles from './Back.module.scss';
import classNames from 'classnames';

interface Props {
  backLink: string;
  className?: string;
}

export const Back: React.FC<Props> = ({ backLink, className }) => {
  return (
    <div className={classNames(styles.back, className)}>
      <Link className={styles.back__link} to={backLink}>
        Back
      </Link>
    </div>
  );
};
