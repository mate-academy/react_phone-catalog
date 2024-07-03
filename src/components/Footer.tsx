import { twMerge } from 'tailwind-merge';
import { ArrowButton } from './ArrowButton';
import { Logo } from './Logo';
import { NavItem } from './NavItem';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={twMerge('w-full border-t border-elements bg-white', className)}
    >
      <nav className="flex items-center justify-center">
        <ul
          className="flex max-w-[theme('screens.lg')] flex-1
          flex-col gap-8 px-4 py-8
          md:flex-row md:items-center md:justify-between md:p-8"
        >
          <li>
            <Logo />
          </li>

          <div
            className="flex w-fit
            flex-col gap-4 uppercase text-secondary
            md:flex-row md:gap-3.5 lg:gap-28"
          >
            {[
              ['Github', 'https://github.com/Vlad4567/react_phone-catalog'],
              ['Rights', '/rights'],
              ['Contacts', 'https://github.com/Vlad4567'],
            ].map(([text, path]) => (
              <NavItem key={text} path={path}>
                {text}
              </NavItem>
            ))}
          </div>

          <li className="flex items-center justify-center gap-4">
            <small className="text-secondary">Back to top</small>
            <ArrowButton
              position="top"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
};
