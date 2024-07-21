import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useProduct } from '../../store/Store';

interface HeaderLinkProps {
  to: string;
  imgSrc: string;
  alt: string;
  counter: number;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({
  to,
  imgSrc,
  alt,
  counter,
}) => {
  const { isOpen } = useProduct();

  return (
    <>
      <NavLink
        to={to}
        className={cn('header__link', {
          'header__link-isOpen': isOpen,
        })}
      >
        <img src={imgSrc} alt={alt} className="header__link-img" />
      </NavLink>

      {counter > 0 && (
        <span
          className="header__counter"
          style={{ left: isOpen ? '53%' : '', top: isOpen ? '42%' : '' }}
        >
          {counter}
        </span>
      )}
    </>
  );
};

export default HeaderLink;
