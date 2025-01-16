import classNames from 'classnames';
import styles from './PhotoPreview.module.scss';

type HandleClick = () => void;

type Props = {
  photo: string;
  alt: string;
  label: string;
  onClick: HandleClick;
  active?: boolean;
  className?: string;
};

export const PhotoPreview: React.FC<Props> = ({
  photo,
  alt,
  label,
  onClick,
  active,
  className,
}) => {
  return (
    <li className={classNames(styles.PhotoPreview, className)}>
      <button
        type="button"
        onClick={onClick}
        className={classNames(styles.Button, active && styles.Button_active)}
      >
        <span className={styles.Label}>{label}</span>
        <img src={photo} alt={alt} draggable={false} className={styles.Image} />
      </button>
    </li>
  );
};
