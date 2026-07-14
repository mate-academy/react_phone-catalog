import { Link } from 'react-router-dom';
import styles from './EmptyState.module.scss';
import classNames from 'classnames';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props {
  title: string;
  imageSrc: string;
  actionText?: string;
  actionUrl?: string;
  className?: string;
}
export const EmptyState: React.FC<Props> = ({
  title,
  imageSrc,
  actionText = 'Go Home',
  actionUrl = '/',
  className,
}) => (
  <div className={classNames(styles['empty-state'], className)}>
    <h1 className={styles['empty-state__title']}>{title}</h1>

    <Link className={styles['empty-state__link']} to={actionUrl}>
      {actionText}
    </Link>

    <img
      className={styles['empty-state__image']}
      src={getImageUrl(imageSrc)}
      alt=""
      role="presentation"
    />
  </div>
);
