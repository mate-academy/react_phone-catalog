import { Banners } from '../Banners/Banners';
import { Navigation } from '../Navigation/Navigation';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="home">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        <Banners />
      </div>
    </>
  );
};
