import { FC } from 'react';
import { NavLink } from 'react-router';
import cn from 'clsx';
import Logo from '/src/assets/logo.svg?react';
import ArrowUp from '/src/assets/icons/arrow-up.svg?react';

export const Footer: FC = () => {
  return (
    <footer className="flex items-stretch shadow-up shadow-elements">
      <div className="container">
        <div className="flex flex-col items-start justify-center gap-8 py-8 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex justify-start sm:grow">
            <NavLink to="../public" className="flex">
              <Logo className="h-8" />
            </NavLink>
          </div>

          <nav className="sm:grow">
            <ul className="flex h-full flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <li className="flex self-stretch">
                <NavLink
                  to="https://github.com/4xmplme"
                  target="_blank"
                  className={({ isActive }) =>
                    cn(
                      'text-uppercase transition',
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
                      'text-uppercase transition',
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
                      'text-uppercase transition',
                      isActive ? 'text-primary' : 'text-secondary',
                    )
                  }
                >
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="self-center sm:flex sm:grow sm:justify-end">
            <button
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }
              className="flex items-center gap-4 transition text-secondary group hover:text-primary"
            >
              <span className="text-small">Back to top</span>
              <div className="shadow-inner transition size-8 p-[8px] shadow-elements group-hover:shadow-primary">
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
