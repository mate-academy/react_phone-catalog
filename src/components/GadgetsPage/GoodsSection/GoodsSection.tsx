import React, { useContext, useEffect, useState } from 'react';
import { Product } from 'src/types/Product';
import Card from 'src/components/ui/Card/Card';
import './GoodsSection.scss';
import Pagination from '../Pagination/Pagination';
import { StateContext } from 'src/store';
import { PageType } from 'src/types/PageType';

interface Props {
  cards: Product[];
  filters: {
    sortBy: string;
    itemsPerPage: string;
  };
  type: string;
}

const GoodsSection: React.FC<Props> = ({ cards, filters, type }) => {
  const [sortedCards, setSortedCards] = useState<Product[]>([]);
  const [paginatedCards, setPaginatedCards] = useState<Product[][]>([[]]);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState(0);
  const [activeSection, setActiveSection] = useState(1);
  const { favourites } = useContext(StateContext);

  const { sortBy, itemsPerPage } = filters;
  const isPagination = itemsPerPage !== 'all';
  const isFavouriteNoItems =
    favourites.length === 0 && type === PageType.Favourite;

  // Effect to sort cards
  useEffect(() => {
    const sorted = [...cards].sort((a, b) =>
      sortBy === 'newest' ? b.year - a.year : a.year - b.year
    );
    setSortedCards(sorted);
  }, [cards, sortBy]);

  useEffect(() => {
    setActivePage(1);
    setActiveSection(1);
  }, [itemsPerPage]);

  // Effect to paginate sorted cards
  useEffect(() => {
    const itemsCount =
      itemsPerPage === 'all' ? sortedCards.length : parseInt(itemsPerPage, 10);
    const totalPages = Math.ceil(sortedCards.length / itemsCount);
    setPages(totalPages);

    const newPaginatedCards: Product[][] = [];
    for (let i = 0; i < sortedCards.length; i += itemsCount) {
      newPaginatedCards.push(sortedCards.slice(i, i + itemsCount));
    }
    setPaginatedCards(newPaginatedCards);
    setActiveSection(Math.ceil(activePage / 4));
  }, [sortedCards, itemsPerPage, activePage]);

  // Handle setting active page
  const handleSetActivePage = (page: number) => {
    setActivePage(page);
    setActiveSection(Math.ceil(page / 4));
  };

  const itemsToMap =
    itemsPerPage === 'all' ? sortedCards : paginatedCards[activePage - 1] || [];

  return (
    <div className="goods-section">
      {isFavouriteNoItems && (
        <div className="goods-section__no-items">
          <img
            src="icons/Discovery-cuate.png"
            alt=""
            className="goods-section__no-items--image"
          />
          <h5 className="goods-section__no-items--text">No items Selected</h5>
        </div>
      )}
      <div className="goods-section__main">
        {itemsToMap.map(item => (
          <Card data={item} key={item.itemId} />
        ))}
      </div>
      {isPagination && (
        <div className="goods-section__footer pagination">
          <Pagination
            handleSetActivePage={handleSetActivePage}
            pages={pages}
            activePage={activePage}
            activeSection={activeSection}
          />
        </div>
      )}
    </div>
  );
};

export default GoodsSection;
