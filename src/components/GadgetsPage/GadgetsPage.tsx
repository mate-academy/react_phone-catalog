import React, { useContext, useEffect, useState } from 'react';
import Filter from './Filter/FIlter';
import { PageType } from 'src/types/PageType';
import './gadgetsPageStyles.scss';
import AdressLine from '../ui/adressLine/AdressLine';
import { StateContext } from 'src/store';
import GoodsSection from './GoodsSection/GoodsSection';
import AnimatedTitle from '../ui/AnimatedTitle/AnimatedTitle';

interface Props {
  type: PageType;
}

const GadgetsPage: React.FC<Props> = ({ type }) => {
  const notFavourite = type !== PageType.Favourite;
  const isPhonesPage = type === PageType.Phones;

  const [filters, setFilters] = useState({
    sortBy: 'newest',
    itemsPerPage: 'all',
  });
  const { products, cart, favourites } = useContext(StateContext);

  const sortingCards = () => {
    let Sortedcards;

    switch (type) {
      case PageType.Phones:
        Sortedcards = products.filter(elem => elem.category === 'phones');
        break;

      case PageType.Tablets:
        Sortedcards = products.filter(elem => elem.category === 'tablets');
        break;

      case PageType.Accessories:
        Sortedcards = products.filter(elem => elem.category === 'accessories');
        break;

      case PageType.Favourite:
        Sortedcards = cart;
        break;

      default:
        break;
    }

    return Sortedcards;
  };

  useEffect(() => {
    sortingCards();
  }, [type]);

  const cardsToSend = PageType.Favourite === type ? favourites : sortingCards();

  const handleFiltersChange = (newFilters: {
    sortBy: string;
    itemsPerPage: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="gadgets">
      <div className="gadgets__header">
        <div className="gadgets__header--wrapper container">
          <div className="gadgets__adress">
            <AdressLine />
          </div>

          <AnimatedTitle text={isPhonesPage ? 'Mobile Phones' : type} />

          <div className="gadgets__sub-title">{cardsToSend.length} Models</div>
          {notFavourite && (
            <div className="gadgets__filter">
              <Filter
                title="sort by"
                items={['newest', 'latest']}
                type="sort"
                defaultItem={0}
                selectedValue={filters.sortBy}
                onFilterChange={value =>
                  handleFiltersChange({ ...filters, sortBy: value })
                }
              />
              <Filter
                title="items on page"
                items={['4', '8', '16', 'all']}
                type="itemsPerPage"
                defaultItem={3}
                selectedValue={filters.itemsPerPage}
                onFilterChange={value =>
                  handleFiltersChange({ ...filters, itemsPerPage: value })
                }
              />
            </div>
          )}

          <GoodsSection cards={cardsToSend} filters={filters} type={type} />
        </div>
      </div>
    </div>
  );
};

export default GadgetsPage;
