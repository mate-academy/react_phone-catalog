import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text:string;
  className: string;
};

export const PageNavLink: FC<Props> = ({ to, text, className }) => {
  return (
    <NavLink
      to={{ pathname: to }}
      className={className}
    >
      {text}
    </NavLink>
  );
};
