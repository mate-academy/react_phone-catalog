import React from 'react';
import styles from './NavButton.module.scss';
import '../../styles/App.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type NavButtonProps = {
  children: React.ReactNode;
  right?: boolean;
  notActive?: boolean;
  linkTo?: string;
};

const NavButton: React.FC<NavButtonProps> = ({
  children,
  right = false,
  notActive = false,
  linkTo = '/',
}) => {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (right == false) {
      e.preventDefault();
      navigate(-1);
    }
  }

  return (
    <NavLink
      to={linkTo}
      className={classNames(styles.button, {
        [styles['button--not-active']]: notActive,
      })}
      onClick={e => handleClick(e)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`${styles.button__icon} ${right ? styles['button__icon--right'] : ''}`}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z"
          fill="currentColor"
        />
      </svg>
      <span className={styles.button__text}>{children}</span>
    </NavLink>
  );
};

export default NavButton;
