import { Link } from 'react-router-dom';
import styles from './Icon.module.scss';

interface IconProps {
  to: string | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  modifier?: string[] | string;
}

const Icon: React.FC<IconProps> = ({ to, modifier }) => {
  const isLinkComponent = typeof to === 'string';
  let additional = isLinkComponent ? styles[to] || '' : '';

  if (modifier) {
    const addClasses = Array.isArray(modifier)
      ? modifier.map(iconClass => styles[iconClass] || '').join(' ')
      : styles[modifier];

    additional += ' ' + addClasses;
  }

  return (
    <>
      {isLinkComponent ? (
        <Link to={to} className={`${styles.icon} ${additional}`} />
      ) : (
        <button
          className={`${styles.icon} ${additional}`}
          onClick={to}
        ></button>
      )}
    </>
  );
};

export default Icon;
