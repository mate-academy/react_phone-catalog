import { useCallback, useEffect, useState } from 'react';
import { Menu } from '../Menu/Menu';
import scss from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const onClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className={scss.header}>
      <div className={scss.header__container}>
        <a href="/" aria-label="Link to main page">
          <svg className={scss.logoIcon}>
            <use href="/icons/icons.svg#logo-icon"></use>
          </svg>
        </a>
        <button
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className={scss.icon} aria-hidden={true} focusable={false}>
            <use
              href={`/icons/icons.svg#${isMenuOpen ? 'close-icon' : 'burger-icon'}`}
            />
          </svg>
        </button>
      </div>

      <Menu isMenuOpen={isMenuOpen} onClose={onClose} />
    </header>
  );
};
