import { Link } from 'react-router-dom';
import './Home.scss';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__wrapper">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

        <div className="home__banner--box">
          <img src="/img/ui-kit/Slider-button-left.png" alt="" />

          <Link to="/phones">
            <img src="/img/banners/Banner.png" alt="banner" />
          </Link>

          <img src="/img/ui-kit/Slider-button-right.png" alt="" />
        </div>
      </div>
    </div>
  );
};
