import React, { useContext, useEffect, useState } from 'react';
import { BreadCrumb } from '../MultipurposeComponents/BreadCrumb/breadCrumb';
import { DFS } from '../Additional/additional_api';
import { CatalogMaker } from '../MultipurposeComponents/CatalogMaker/catalogMaker';
import { ItemsSorting } from '../MultipurposeComponents/ItemsSorting/itemsSorting';
import { NavBar } from '../MultipurposeComponents/Pagination/navBar';

export const TabletsCatalog = () => {
  const [tablets, setTablets] = useState([]);
  const [sort, setSort] = useState('age');
  const [activeTab, setActiveTab] = useState(1);
  const [viewQty, setViewQty] = useState(4);
  const [position, setPosition] = useState(0);

  const dataFromServer = useContext(DFS);

  const getSortedItems = (query: string) => {
    if (query === 'age') {
      return tablets.sort((a: { age: number },
        b: { age: number }) => a.age - b.age);
    }

    if (query === 'name') {
      return tablets
        .sort((a: { name: string },
          b: { name: string }) => a.name.localeCompare(b.name));
    }

    if (query === 'price_asc') {
      return tablets.sort((a: { price: number },
        b: { price: number }) => a.price - b.price);
    }

    if (query === 'price_desc') {
      return tablets.sort((a: { price: number },
        b: { price: number }) => b.price - a.price);
    }

    return undefined;
  };


  const sortedTablets = getSortedItems(sort);


  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { type: string }) => el.type === 'tablet'))
      .then(data => setTablets(data));
  }, [dataFromServer]);


  return (
    <>
      <BreadCrumb page="TabletsCatalog" />
      <h1 className="PhonesCatalog__header">Mobile phones</h1>
      <p className="PhonesCatalog__qty">
        {tablets.length}
        {' '}
        models
      </p>
      <ItemsSorting
        setSort={setSort}
        setActiveTab={setActiveTab}
        setPosition={setPosition}
        setViewQty={setViewQty}
      />
      <div
        className="PhonesCatalog__items_wrapper"
        style={{ height: `${(viewQty / 4) * 507}px` }}
      >
        <div
          className="PhonesCatalog__items"
          style={{ bottom: position }}
        >
          {sortedTablets && <CatalogMaker gadgets={sortedTablets} />}
        </div>
      </div>
      {sortedTablets && sortedTablets.length > viewQty ? (
        <div className="PhonesCatalog__navigation">
          <NavBar
            sortedPhones={sortedTablets}
            activeTab={activeTab}
            viewQty={viewQty}
            position={position}
            setActiveTab={setActiveTab}
            setPosition={setPosition}
          />
        </div>
      ) : ''}
    </>
  );
};
