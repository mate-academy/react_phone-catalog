import classNames from 'classnames';
import style from './FooterLinks.module.scss';
import { Link } from 'react-router-dom';
import { CopyrightModal } from '../CopyrightModal';
import { useState } from 'react';

export const FooterLinks: React.FC = () => {
  const [isVisibleCopyright, setIsVisibleCopyright] = useState(false);

  const toogleModal = () => {
    setIsVisibleCopyright(prev => !prev);
  };

  return (
    <div className={classNames(style.link_container)}>
      {isVisibleCopyright && <CopyrightModal toggleModal={toogleModal} />}

      <Link
        to={'https://github.com/syavaYki'}
        className={classNames(style.link)}
        target="_blank"
      >
        Github
      </Link>

      <Link
        to={'mailto:copyright@sevapodolskiywebstudio.com'}
        className={classNames(style.link)}
      >
        Contacts
      </Link>

      <Link
        to={'/'}
        className={classNames(style.link)}
        onClick={() => toogleModal()}
      >
        Rights
      </Link>
    </div>
  );
};
