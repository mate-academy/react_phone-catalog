import React from 'react';
import st from './Footer.module.scss';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

type Props = {
  scroleToHeader: () => void;
};
const Footer: React.FC<Props> = ({ scroleToHeader }) => {
  return (
    <div className={st.footer}>
      <Logo />
      <ul className={st.footer__menu}>
        <li className={st.footer__item}>
          <Link to="">Github</Link>
        </li>
        <li className={st.footer__item}>
          <Link to="">contacts</Link>
        </li>
        <li className={st.footer__item}>
          <Link to="">Righs</Link>
        </li>
      </ul>
      <div className={st.footer__back} onClick={scroleToHeader}>
        <span>Back to top</span>
        <span className={st.footer__arrow}>
          <span className="icon-arrow"></span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
