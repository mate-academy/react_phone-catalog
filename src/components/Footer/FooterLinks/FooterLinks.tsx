import classNames from 'classnames';
import style from './FooterLinks.module.scss';
import { Link } from 'react-router-dom';

export const FooterLinks: React.FC = () => {
  return (
    <div className={classNames(style.container)}>
      <Link
        to={'/'}
        className={classNames(style.link)}
      >
        Github
      </Link>

      <Link
        to={'/'}
        className={classNames(style.link)}
      >
        Contacts
      </Link>

      <Link
        to={'/'}
        className={classNames(style.link)}
      >
        rights
      </Link>
    </div>
  );
};
