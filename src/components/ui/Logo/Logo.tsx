import { Link } from 'react-router-dom';
import cl from './Logo.module.scss';

export const Logo = () => (
  <div className={cl.logoWrapper}>
    <Link className={cl.logoLink} to="/" />
  </div>
);
