const HeaderLogoMenu = () => {
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
            href="#burger-menu"
            className={`${iconStyles.icon} ${iconStyles['icon--menu']} ${topBatStyles['top-bar__icon--menu']}`}
            onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
          ></a>
        </div>
      </div>
    </div>
  );
};
