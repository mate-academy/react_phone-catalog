import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Nice Gadgets store!</h1>
      <div className="home-page__banner">
        <div className="home-page__banner-container">
          <div className="home-page__banner-button">
            <img src="/icons/arrow_left.svg" alt="Arrow left" />
          </div>

          <img src="/home_banner.png" alt="Banner" />

          <div className="home-page__banner-button">
            <img src="/icons/arrow_right.svg" alt="Arrow right" />
          </div>
        </div>

        <div className="home-page__banner-pages">
          <div className="home-page__banner-page"></div>
          <div className="home-page__banner-page"></div>
          <div className="home-page__banner-page"></div>
        </div>
      </div>
    </div>
  );
};
