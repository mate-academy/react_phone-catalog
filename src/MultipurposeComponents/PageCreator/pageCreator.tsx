import React, { FC, useState } from 'react';
import { BreadCrumb } from '../BreadCrumb/breadCrumb';
import { Phone } from '../../Additional/interfaces';
import { ItemsSorting } from '../ItemsSorting/itemsSorting';
import { CatalogMaker } from '../CatalogMaker/catalogMaker';
import { NavBar } from '../Pagination/navBar';
import './pageCreator.scss';
import { SearchBar } from '../SearchBar/searchBar';

type Params = {
  pageName: string;
  gadgets: Phone[];
};


export const PageCreator: FC<Params> = ({
  pageName,
  gadgets,
}) => {
  const [sort, setSort] = useState('age');
  const [search, setSearch] = useState('');
  const [viewQty, setViewQty] = useState(4);
  const [position, setPosition] = useState(0);
  const [activeTab, setActiveTab] = useState(1);

  const sortBySearch = gadgets
    .filter(el => el.name.toLocaleLowerCase().trim()
      .includes(search.toLocaleLowerCase().trim()));


  const getSortedItems = (query: string, searchedGadgets: Phone[]) => {
    switch (query) {
      case 'age':
        return (searchedGadgets.sort((a: { age: number },
          b: { age: number }) => a.age - b.age));

      case 'name':
        return searchedGadgets
          .sort((a: { name: string },
            b: { name: string }) => a.name.localeCompare(b.name));

      case 'price_asc':
        return searchedGadgets
          .sort((a: { price: number },
            b: { price: number }) => a.price - b.price);
      case 'price_desc':
        return searchedGadgets
          .sort((a: { price: number },
            b: { price: number }) => b.price - a.price);
      default:
    }

    return '';
  };

  const sortedGadgets = getSortedItems(sort, sortBySearch);

  return (
    <div className="PageCreator">
      <SearchBar pageName={pageName} setSearch={setSearch} />
      <BreadCrumb page={pageName} />
      <h1 className="PhonesCatalog__header">{pageName}</h1>
      <p className="PhonesCatalog__qty">
        {gadgets.length}
        {' '}
        models
      </p>
      <ItemsSorting
        options={gadgets.length}
        setSort={setSort}
        setActiveTab={setActiveTab}
        setPosition={setPosition}
        setViewQty={setViewQty}
      />
      <div
        className="PhonesCatalog__items_wrapper"
        style={{ height: `${(viewQty / 4) * 547}px` }}
      >
        <div
          className="PhonesCatalog__items"
          style={{ bottom: position }}
        >
          {sortedGadgets && <CatalogMaker gadgets={sortedGadgets} />}
        </div>
      </div>
      {sortedGadgets && sortedGadgets.length > viewQty ? (
        <div className="PhonesCatalog__navigation">
          <NavBar
            sortedPhones={sortedGadgets}
            activeTab={activeTab}
            viewQty={viewQty}
            position={position}
            setActiveTab={setActiveTab}
            setPosition={setPosition}
          />
        </div>
      ) : ''}
    </div>
  );
};
