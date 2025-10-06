import { Link } from 'react-router-dom';
import './Home.scss';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__wrapper">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

        <div className="home__banner--box">
          <div className="home__slider-button">
            <img src="/img/ui-kit/chevron-arrow-left.png" alt="button" />
          </div>

          <Link to="/phones">
            <img
              src="/img/banners/Banner.png"
              alt="banner"
              className="home-banner"
            />
          </Link>

          {/* <Link to="/tablets">
            <img src="https://i.imgur.com/RgR1JJm.png" alt="banner" className='home-banner' />
          </Link> */}

          {/* <Link to="/accessories">
                    <img src="public/img/banners/banner-accessories.png" alt="banner" className='home-banner' />
                  </Link> */}

          <div className="home__slider-button--left">
            <img src="/img/ui-kit/chevron-arrow-left.png" alt="button" />
          </div>
        </div>
      </div>
    </div>
  );
};
