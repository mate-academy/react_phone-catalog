import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';
import { IconModifiers } from '../../../types/iconModifiers';

interface IconProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  modifiers?: IconModifiers[] | IconModifiers;
}

const getClassName = (modifier: string) =>
  styles[('icon_' + modifier) as keyof typeof styles] || '';

const Icon: React.FC<IconProps> = ({ href, onClick, modifiers }) => {
  const isLink = !!href;
  const isButton = !!onClick;

  let additional = '';

  if (modifiers) {
    if (typeof modifiers === 'string') {
      additional = getClassName(modifiers);
    } else {
      additional = modifiers.reduce((iconStyles, modifier) => {
        return iconStyles + ' ' + getClassName(modifier);
      }, '');
    }
  }

  if (isLink) {
    return <Link to={href} className={`${styles.icon} ${additional}`} />;
  }

  if (isButton) {
    return (
      <button
        className={`${styles.icon} ${additional}`}
        onClick={onClick}
      ></button>
    );
  }

  return <span className={`${styles.icon} ${additional}`}></span>;
};

export default Icon;
