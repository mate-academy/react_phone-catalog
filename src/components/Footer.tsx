import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import Logo from '/src/images/logo.svg?react';
import ArrowUp from '/src/images/icons/arrow-up.svg?react';
import { Button } from './Button';
import type { FC } from 'react';
import { FOOTER_NAVIGATION as NAVIGATION } from '../constants';

type Props = {
  className?: string;
};

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        'shadow-top shadow-elements dark:shadow-d-surface2 flex items-stretch',
        className,
      )}
    >
      <div className="container">
        <div className="flex flex-col items-start justify-center gap-8 py-8 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex justify-start sm:flex-[1_1_auto]">
            <NavLink to="/" className="flex">
              <Logo className="fill-primary dark:fill-d-white h-8" />
            </NavLink>
          </div>

          <nav className="sm:flex-[1_1_auto]">
            <ul className="flex h-full flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              {NAVIGATION.map(({ title, href }) => (
                <li key={title} className="flex self-stretch">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-uppercase text-secondary dark:text-d-secondary hover:text-primary dark:hover:text-d-white transition"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="self-center sm:flex sm:flex-[1_1_auto] sm:justify-end">
            <Button
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }
              className="group flex items-center gap-4"
            >
              <span className="text-small text-secondary dark:text-d-secondary group-hover:text-primary dark:group-hover:text-d-white transition">
                Back to top
              </span>
              <Button
                as="div"
                className="shadow-elements dark:bg-d-surface2 dark:shadow-d-surface2 group-hover:shadow-primary dark:group-hover:bg-d-icons dark:group-hover:shadow-d-icons flex size-8 items-center justify-center p-2 shadow-inner transition"
              >
                <ArrowUp className="fill-primary dark:fill-d-white" />
              </Button>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
