import { Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './Logo.module.scss';

type Props = {
  linkClassName?: string;
  imgClassName?: string;
};

export const Logo = ({ linkClassName = '', imgClassName = '' }: Props) => {
  return (
    <Link to="/" className={`${styles.wrapper} ${linkClassName}`}>
      <img
        src={logo}
        alt="Nice Gadgets logo"
        className={`${styles.image} ${imgClassName}`}
      />
    </Link>
  );
};
