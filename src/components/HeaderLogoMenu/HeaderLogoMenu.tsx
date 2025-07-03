import { useState } from 'react';
import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';

interface SidebarProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  iconClass: string;
}

const HeaderLogoMenu: React.FC<SidebarProps> = ({
  setIsMenuOpen,
  iconClass,
}) => {
  const iconReference = iconClass === 'icon--menu' ? '#burger-menu' : '#';
  const [iconWindow, setIconWindow] = useState<string>(iconClass);

  console.log(iconClass);
  console.log(iconWindow);

  return (
    <div className={topBatStyles.header}>
      <div className={topBatStyles['top-bar']}>
        <div className={topBatStyles['top-bar__navigation__wrapper']}>
          <a href="#" className={topBatStyles['top-bar__logo']}>
            <img
              src="public\img\gadgets-logo.png"
              alt="img-logo"
              className={topBatStyles['top-bar__logo-img']}
            />
          </a>

          <ul className={topBatStyles['top-bar__list']}>
            <li className={topBatStyles['top-bar__item']}>
              <a className={topBatStyles['top-bar__link']} href="#who-we-are">
                home
              </a>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <a
                className={topBatStyles['top-bar__link']}
                href="#service-agency"
              >
                Phones
              </a>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <a
                className={topBatStyles['top-bar__link']}
                href="#service-agency"
              >
                tablets
              </a>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <a className={topBatStyles['top-bar__link']} href="#experience">
                accessories
              </a>
            </li>
          </ul>
        </div>

        <div className={topBatStyles['top-bar__icon-1']}>
          <a
            href={iconReference}
            className={`${iconStyles.icon} ${iconStyles[`${iconClass}`]}`} // ${topBatStyles['top-bar__icon--menu']}
            onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
          ></a>

          <div className={iconStyles['icon--heart__wrapper']}>
            <a
              href="#"
              className={`${iconStyles['icon--heart']} ${iconStyles.icon}`}
            ></a>
          </div>

          <div className={iconStyles['icon--bag__wrapper']}>
            <a
              href="#"
              className={`${iconStyles['icon--bag']} ${iconStyles.icon}`}
            ></a>

            <span className={iconStyles.badge}>12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogoMenu;
