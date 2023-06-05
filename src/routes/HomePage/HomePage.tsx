import { Banner } from '../../components/Banner/Banner';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__banner">
        <Banner />
      </div>

      <div className="home-page__hot">
        <CardsContainer title="Hot prices" />
      </div>

      <div className="home-page__new">
        <CardsContainer title="Brand new models" />
      </div>
    </div>
  );
};
