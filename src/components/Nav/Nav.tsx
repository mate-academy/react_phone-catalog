import pageNavList from '../../api/navHeader.json';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import './Nav.scss';

export const Nav = () => {
  return (
    <div className="navbar">
      {pageNavList.map(link => (
        <PageNavLink
          key={link.title}
          to={link.path}
          name={link.title}
        />
      ))}
    </div>
  );
};
