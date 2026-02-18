import { Banner } from '../Banner/Banner';
import { Category } from '../Category/Category';
import { HotPrices } from '../HotPrices';
import { NewModules } from '../NewModels/NewModules';
import './Homepage.scss';

export const Homepage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="home-page__title">
          {/* Welcome to Nice Gadgets store! */}
          Product Catalog
        </h1>

        <Banner />
      </div>

      <NewModules />
      <Category />
      <HotPrices />
    </div>
  );
};
