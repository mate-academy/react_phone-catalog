import { MainLogo } from './MainLogo';
import { NavItem } from './NavItem';
import { SliderButton } from './SliderButton';
import mainLogo from '../images/icons/main-logo-desktop.svg';
import arrovButton from '../images/icons/arrov-icon.svg';

export const Footer = () => {
  return (
    <footer
      className="
       content fixed inset-x-0 bottom-0 flex flex-col justify-between
       gap-8 border-t border-elements py-8 md:h-24 md:flex-row
      "
    >
      <MainLogo className="m-0">
        <img
          className="w-22 h-8 cursor-pointer lg:mx-6 lg:w-20"
          src={mainLogo}
          alt="Main Logo"
        />
      </MainLogo>

      <nav className="flex md:items-center">
        <ul
          className="
            flex flex-col items-start gap-4 md:flex-row lg:gap-26.5
          "
        >
          {[
            { id: 1, title: 'github', link: 'github' },
            { id: 2, title: 'contacts', link: 'contacts' },
            { id: 3, title: 'rights', link: 'rights' },
          ].map(item => (
            <li className="flex h-7 justify-center md:h-full" key={item.id}>
              <NavItem to={item.link}>{item.title}</NavItem>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-center gap-4 md:w-fit">
        <p>Back to top</p>

        <SliderButton>
          <img src={arrovButton} alt="Arrov Top" />
        </SliderButton>
      </div>
    </footer>
  );
};
