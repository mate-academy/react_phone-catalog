import { NavLink } from 'react-router-dom';

type NavbarLinkProps = {
  children?: React.ReactNode;
  title: string;
};

const isLinkActive = ({ isActive }: { isActive: boolean }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

export const NavbarLink = ({
  children,
  title,
}: React.PropsWithChildren<NavbarLinkProps>) => (
  <NavLink
    title={title}
    className={isLinkActive}
    to={`/${title.toLowerCase()}`}
  >
    {children}
  </NavLink>
);
