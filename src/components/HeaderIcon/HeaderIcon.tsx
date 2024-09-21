import styles from './HeaderIcon.module.scss';

type Props = {
  type: string;
  size?: 'default' | 'wide';
  href: string;
};
export const Icon: React.FC<Props> = ({ type, size = 'default', href }) => {
  const sizeClass = size === 'wide' ? styles['icon--wide'] : '';

  return (
    <a
      className={`${styles.icon} ${styles[`icon--${type}`]} ${sizeClass}`}
      href={href}
    ></a>
  );
};
