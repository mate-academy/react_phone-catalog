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

  return (
    <div className={topBatStyles.header}>
      <div className={topBatStyles['top-bar']}>
        <a href="#" className={topBatStyles['top-bar__logo']}>
          <img
            src="public\img\gadgets-logo.png"
            alt="img-logo"
            className={topBatStyles['top-bar__logo-img']}
          />
        </a>

        <div className={topBatStyles['top-bar__icon-1']}>
          <a
            href={iconReference}
            className={`${iconStyles.icon} ${iconStyles[`${iconClass}`]} ${topBatStyles['top-bar__icon--menu']}`}
            onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
          ></a>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogoMenu;
