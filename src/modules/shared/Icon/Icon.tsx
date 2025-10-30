import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';
import { IconModifiers } from '../../../types/iconModifiers';

interface IconProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  modifiers?: IconModifiers[] | IconModifiers;
  border?: boolean;
}

const getClassName = (modifier: string) =>
  styles[('icon__img_' + modifier) as keyof typeof styles] || '';

const Icon: React.FC<IconProps> = ({ href, onClick, modifiers, border }) => {
  const isLink = !!href;
  const isButton = !!onClick;

  const additional = Array.isArray(modifiers)
    ? modifiers.map(getClassName).join(' ').trim()
    : typeof modifiers === 'string'
      ? getClassName(modifiers)
      : '';

  const imgElement = (
    <span className={`${styles.icon__img} ${additional}`}></span>
  );

  if (isLink) {
    return (
      <Link
        to={href}
        className={styles.icon + ' ' + (border ? styles.icon_border : '')}
      >
        {imgElement}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button
        className={styles.icon + ' ' + (border ? styles.icon_border : '')}
        onClick={onClick}
      >
        {imgElement}
      </button>
    );
  }

  return <span className={`${styles.icon} ${additional}`}></span>;
};

export default Icon;
