import { Breadcrumbs } from '../PageSmallNav';
import { SectionHeader } from '../SectionHeader';

import './FavouritesPage.scss';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../ProductCard';
import { NoResults } from '../NoResults';

export const FavouritesPage = () => {
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const favouritesItemsCount = favouritesItems.length;

  return (
    <div className="favourites">
      <Breadcrumbs />
      <SectionHeader
        title="Favourites"
        subtitle={
          favouritesItemsCount
            ? `${favouritesItemsCount} items`
            : undefined
        }
      />
      { favouritesItems.length ? (
        <div className="favourites__cards">
          {
            favouritesItems.map(item => (
              <ProductCard product={item} key={item.id} />
            ))
          }
        </div>
      )
        : (
          <NoResults title="Your favourites list is empty" />
        )}
    </div>
  );
};
