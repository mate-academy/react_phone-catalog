import { NavLink } from 'react-router-dom';
import styles from './HeaderIcon.module.scss';
import { QuantityIndicator } from '../QuantityIndicator';

type Props = {
  type: string;
  href: string;
  size?: 'default' | 'wide';
  onClick: () => void;
  number: number | null;
};
export const HeaderIcon: React.FC<Props> = ({
  type,
  size = 'default',
  href,
  number,
  onClick,
}) => {
  const sizeClass = size === 'wide' ? styles['icon--wide'] : '';
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      borderBottom: isActive ? '3px solid #0f0f11' : '',
    };
  };

  return (
    <div className={`${styles.icon} ${sizeClass}`}>
      <NavLink
        className={`${styles.icon__image} ${styles[`icon__image--${type}`]}`}
        style={getLinkStyle}
        to={href}
        onClick={onClick}
      ></NavLink>
      {number !== null && (
        <div className={styles.icon__quantity}>
          <QuantityIndicator number={number} />
        </div>
      )}
    </div>
  );
};
