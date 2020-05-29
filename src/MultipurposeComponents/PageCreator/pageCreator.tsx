import React, { FC, useState } from 'react';
import { BreadCrumb } from '../BreadCrumb/breadCrumb';
import { Phones } from '../../Additional/interfaces';
import { ItemsSorting } from '../ItemsSorting/itemsSorting';
import { CatalogMaker } from '../CatalogMaker/catalogMaker';
import { NavBar } from '../Pagination/navBar';
import './pageCreator.scss';

type Params = {
  pageName: string;
  gadgets: Phones[];
  route: string;
};


export const PageCreator: FC<Params> = ({
  pageName,
  gadgets,
  route,
}) => {
  const [sort, setSort] = useState('age');
  const [viewQty, setViewQty] = useState(4);
  const [position, setPosition] = useState(0);
  const [activeTab, setActiveTab] = useState(1);

  const getSortedItems = (query: string) => {
    switch (query) {
      case 'age':
        return (gadgets.sort((a: { age: number },
          b: { age: number }) => a.age - b.age));

      case 'name':
        return gadgets
          .sort((a: { name: string },
            b: { name: string }) => a.name.localeCompare(b.name));

      case 'price_asc':
        return gadgets
          .sort((a: { price: number },
            b: { price: number }) => a.price - b.price);
      case 'price_desc':
        return gadgets
          .sort((a: { price: number },
            b: { price: number }) => b.price - a.price);
      default:
    }

    return '';
  };

  const sortedGadgets = getSortedItems(sort);


  return (
    <div className="PageCreator">
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
          {sortedGadgets && <CatalogMaker gadgets={sortedGadgets} route={route} />}
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
