import './Menu.scss';
import classNames from 'classnames';

import { PageNavLink } from '../../Pages/PageNavLink/PageNavLink';

type Props = {
  setIsMenu: (value: boolean) => void,
  isMenu: boolean,
};

export const Menu: React.FC<Props> = ({ setIsMenu, isMenu }) => {
  return (
    <section
      className={classNames('menu', { 'menu--smooth': isMenu })}
      style={{ transition: '300ms' }}
    >
      <div className="menu__container">
        <nav>
          <ul
            className="nav__list"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '40%',
              height: '100vh',
              backgroundColor: '#fff',
              paddingTop: '50px',
            }}
          >

            <li onClick={() => setIsMenu(false)}>
              <PageNavLink to="home" text="Home" />
            </li>

            <li onClick={() => setIsMenu(false)}>
              <PageNavLink to="phones" text="Phones" />
            </li>

            <li onClick={() => setIsMenu(false)}>
              <PageNavLink to="tablets" text="tablets" />
            </li>

            <li onClick={() => setIsMenu(false)}>
              <PageNavLink to="accessories" text="accessories" />
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
