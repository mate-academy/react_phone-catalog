import { NavLink } from 'react-router-dom';
import styles from './HeaderIcon.module.scss';
import { QuantityIndicator } from '../QuantityIndicator';
import { useTheme } from '../../context/ThemeContext';
import { BASE_URL } from '../../utils/constants';

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
  const { isDarkTheme } = useTheme();
  const sizeClass = size === 'wide' ? styles['icon--wide'] : '';
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      borderBottom: isActive ? '3px solid var(--color-black)' : '',
    };
  };

  return (
    <div className={`${styles.icon} ${sizeClass}`}>
      <NavLink
        className={`${styles.icon__image} ${isDarkTheme ? styles[`icon__image--${type}-dark`] : styles[`icon__image--${type}`]}`}
        style={getLinkStyle}
        to={`${BASE_URL}${href}`}
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
