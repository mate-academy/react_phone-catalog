import React from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';

const WelcomeSlider: React.FC = () => {
  return (
    <>
      <div className={topBatStyles.header}>
        <div className={topBatStyles['top-bar']}>
          <a href="#" className="top-bar__logo">
            <img src="public\img\gadgets-logo.png" alt="img-logo" />
          </a>

          <a
            href="#burger-menu"
            className={`${iconStyles.icon} ${iconStyles['icon--menu']}`}
          ></a>
        </div>
      </div>

      <div className={welcomeStyles.header__title}>
        Welcome to Nice Gadgets store!
      </div>
    </>
  );
};

export default WelcomeSlider;
