import { PageNavLink } from '../PageNavLink/PageNavLink';

export const PageNavList = () => {
  const pageNavList = [
    { to: '/home', text: 'HOME' },
    { to: '/phones', text: 'PHONES' },
    { to: '/tablets', text: 'TABLETS' },
    { to: '/accessories', text: 'ACCESSORIES' },
  ];

  return (
    <ul className="nav-list">
      { pageNavList.map(navLink => (
        <li className="nav-list__item" key={navLink.text}>
          <PageNavLink
            to={navLink.to}
            text={navLink.text}
          />
        </li>
      ))}
    </ul>
  );
};
