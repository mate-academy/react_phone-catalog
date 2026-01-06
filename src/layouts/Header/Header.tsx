import { Icon } from '../../components/ui/Icon/Icon';
import Logo from '../Logo/Logo';
import './Header.scss';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import DesktopMenu from '../DesktopMenu/DesktopMenu';

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMenu]);

  return (
    <div className="Header">
      <div className="Header__content">
        <Logo />
        <DesktopMenu onClose={setIsOpenMenu} />
      </div>
      <button
        className="Header__burger"
        onClick={() => setIsOpenMenu(prev => !prev)}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isOpenMenu ? 'close' : 'menu'}
            timeout={200}
            classNames="icon"
            nodeRef={iconRef}
          >
            <div ref={iconRef}>
              <Icon name={isOpenMenu ? 'close' : 'menu'} />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </button>

      <CSSTransition
        in={isOpenMenu}
        timeout={300}
        classNames="menu"
        unmountOnExit
        nodeRef={menuRef}
      >
        <MobileMenu ref={menuRef} onClose={() => setIsOpenMenu(false)} />
      </CSSTransition>
    </div>
  );
}
