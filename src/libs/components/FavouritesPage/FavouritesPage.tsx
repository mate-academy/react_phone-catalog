import { PageSmallNav } from '../PageSmallNav';
// import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader';

import './FavouritesPage.scss';

export const FavouritesPage = () => {
  return (
    <div className="favourites">
      <PageSmallNav />
      <SectionHeader
        title="Favourites"
        subtitle="5 items"
      />
      <div className="favourites__cards">
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </div>
  );
};
