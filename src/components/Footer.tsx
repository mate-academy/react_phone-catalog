import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import Logo from '/src/assets/logo.svg?react';
import ArrowUp from '/src/assets/icons/arrow-up.svg?react';

export const Footer: FC = () => {
  return (
    <footer className="flex items-stretch shadow-up shadow-elements">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-0 py-8">
          <div className="flex justify-start md:grow">
            <NavLink to="/public" className="flex">
              <Logo className="h-8" />
            </NavLink>
          </div>

          <nav className="md:grow ">
            <ul className="flex flex-col md:flex-row md:justify-between items-start md:items-start gap-4 md:gap-0 h-full">
              <li className="flex self-stretch">
                <NavLink
                  to="https://github.com/4xmplme"
                  target="_blank"
                  className={({ isActive }) =>
                    cn(
                      'uppercase-text transition',
                      isActive ? 'text-primary' : 'text-secondary',
                    )
                  }
                >
                  GitHub
                </NavLink>
              </li>

              <li className="flex self-stretch">
                <NavLink
                  to="contacts"
                  className={({ isActive }) =>
                    cn(
                      'uppercase-text transition',
                      isActive ? 'text-primary' : 'text-secondary',
                    )
                  }
                >
                  Contacts
                </NavLink>
              </li>

              <li className="flex self-stretch">
                <NavLink
                  to="rights"
                  className={({ isActive }) =>
                    cn(
                      'uppercase-text transition',
                      isActive ? 'text-primary' : 'text-secondary',
                    )
                  }
                >
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="self-center md:grow md:flex md:justify-end">
            <button className="flex items-center gap-4 text-secondary hover:text-primary transition group">
              <span className="small-text">Back to top</span>
              <div className="size-8 p-2 shadow-inner shadow-elements group-hover:shadow-primary transition">
                {/*<div className="icon icon--arrow-up"></div>*/}
                <ArrowUp className="fill-primary" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
