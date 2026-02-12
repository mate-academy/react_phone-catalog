import classNames from 'classnames';
import styles from './Logo.module.scss';
import logoSrcWhite from '../../../public/assets/icons/light_theme/logo.svg';
import logoSrcDark from '/assets/icons/dark_theme/logo.svg';
import { useTheme } from '../../utils/hooks/Context/useTheme';

type Props = {
  size?: 'sm' | 'bg';
};

export const Logo: React.FC<Props> = ({ size = 'sm' }) => {
  const { currentTheme } = useTheme();

  return (
    <img
      className={classNames(styles.logo, styles[`logo--${size}`])}
      src={currentTheme === 'dark' ? logoSrcDark : logoSrcWhite}
      alt="Logo"
    />
  );
};
