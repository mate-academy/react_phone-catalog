import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';


export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background-color-base text-text-color-base-grey sticky top-0 z-50 border-b border-color-border">
      <div className="mx-auto flex items-center justify-between px-4 pl-4 h-12 md:h-[68px] md:px-6">
        <div className="flex items-center gap-12 sm:gap-8 h-full">
          <Link to="/">
            <img
              src="img/Logo2x.svg"
              alt="Logo"
              className="h-5 w-14 transition-all hover:scale-110 md:w-20 md:h-7"
            />
          </Link>
          <nav className="hidden gap-8 relative md:gap-16 sm:flex tracking-wider font-mont">
            <Link to="/" className="relative text-xs font-extrabold uppercase leading-[11px] hover:text-text-color-base-white group">
              Home
              <span className="absolute left-0 -bottom-5 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
            </Link>
            <Link to="/phones" className="relative text-xs font-extrabold uppercase leading-[11px] hover:text-text-color-base-white group">
              Phones
              <span className="absolute left-0 -bottom-5 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
            </Link>
            <Link to="/tablets" className="relative text-xs font-extrabold uppercase leading-[11px] hover:text-text-color-base-white group">
              Tablets
              <span className="absolute left-0 -bottom-5 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
            </Link>
            <Link to="/accessories" className="relative text-xs font-extrabold uppercase leading-[11px] hover:text-text-color-base-white group">
              Accessories
              <span className="absolute left-0 -bottom-5 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
            </Link>
          </nav>
        </div>
        <div className="hidden items-stretch h-full sm:flex">
          <Link to="/favorites" className="flex items-center justify-cente px-4 border-l md:px-6 border-[#3B3E4A] text-text-color-base-white group">
          <img
              src="public/icons/favourites.svg"
              alt="favorites"
              className='group-hover:scale-125 transition-all'
            />
          </Link>
          <Link to="/cart" className="flex items-center justify-center pl-4 border-l md:pl-6 border-[#3B3E4A] text-text-color-base-white group">
          <img
              src="public/icons/shopping_bag.svg"
              alt="shopping_bag"
              className='group-hover:scale-125 transition-all'
            />
          </Link>
        </div>
        <div className="items-stretch h-full flex sm:hidden">
          <button
            className="flex items-center justify-center pl-4 border-l border-[#3B3E4A]"
            onClick={() => setIsMenuOpen(true)}
          >
            <img src="icons/menu.svg" alt="Menu" className="w-3 h-3" />
          </button>
        </div>
        <MobileMenu isMenuOpenNow={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};
