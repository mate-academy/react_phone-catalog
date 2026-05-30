import cn from 'classnames';
import logoLight from '../../assets/images/icons/logo-light.svg';
import logoDark from '../../assets/images/icons/logo-dark.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../contex/Theme';
import { Theme } from '../../utils/constants';

import styles from './Logo.module.scss';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);

  const logo = theme === Theme.LIGTH ? logoLight : logoDark;

  return <img className={cn(styles.logo, className)} src={logo} alt="logo" />;
};
