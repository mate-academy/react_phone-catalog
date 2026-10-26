import { Link, LinkProps } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logo.module.scss';
import { LogoVariants } from '../../../types/Types';

type Props = {
  variant: LogoVariants;
} & LinkProps;

export const Logo = ({ className, variant, ...rest }: Props) => {
  return (
    <Link
      {...rest}
      to="/"
      className={cn(styles.link, className, styles[variant + 'Link'])}
    >
      <img
        src="icons/logo.svg"
        alt="logo"
        className={cn(styles[variant + 'Image'])}
      />
    </Link>
  );
};
