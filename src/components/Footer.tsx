import { Link } from 'react-router-dom';
import logoImg from '../images/logo.svg';
import { ArrowButton } from './ArrowButton';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-elements bg-white">
      <nav className="flex items-center justify-center">
        <ul
          className="flex max-w-[theme('screens.lg')] flex-1
          flex-col gap-8 px-4 py-8
          md:flex-row md:items-center md:justify-between md:p-8"
        >
          <li className="w-fit">
            <Link to="/" className="">
              <img src={logoImg} alt="Logo" />
            </Link>
          </li>

          <div
            className="flex w-fit
            flex-col gap-4 uppercase text-secondary
            md:flex-row md:gap-3.5 lg:gap-28"
          >
            <Link
              className="transition hover:text-primary"
              to="https://github.com/Vlad4567/react_phone-catalog"
            >
              <li>Github</li>
            </Link>
            <Link className="transition hover:text-primary" to="/rights">
              <li>Rights</li>
            </Link>
            <Link
              className="transition hover:text-primary"
              to="https://github.com/Vlad4567"
            >
              <li>Contacts</li>
            </Link>
          </div>

          <li className="flex items-center justify-center gap-4">
            <small className="text-secondary">Back to top</small>
            <ArrowButton
              position="top"
              onClick={() => window.scrollTo({ top: 0, left: 0 })}
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
};
