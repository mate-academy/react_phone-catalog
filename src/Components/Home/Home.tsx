import './Home.scss';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__wrapper">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

        <div className="home__banner--box">
          <img src="/img/ui-kit/Slider-button-left.png" alt="" />
          <img src="/img/banners/Banner.png" alt="banner" />
          <img src="/img/ui-kit/Slider-button-right.png" alt="" />
        </div>
      </div>
    </div>
  );
};
