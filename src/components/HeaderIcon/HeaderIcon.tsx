import styles from './HeaderIcon.module.scss';

type Props = {
  type: string;
  href: string;
  size?: 'default' | 'wide';
  onClick?: (value: string) => void;
};
export const HeaderIcon: React.FC<Props> = ({
  type,
  size = 'default',
  href,
}) => {
  const sizeClass = size === 'wide' ? styles['icon--wide'] : '';

  return (
    <a
      className={`${styles.icon} ${styles[`icon--${type}`]} ${sizeClass}`}
      href={href}
    ></a>
  );
};
