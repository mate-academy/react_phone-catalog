import React, { useContext, useEffect, useState } from 'react';
import { DFS } from '../Additional/additional_api';
import './phonesCatalog.scss';
import { NavBar } from '../MultipurposeComponents/Pagination/navBar';
import { BreadCrumb } from '../MultipurposeComponents/BreadCrumb/breadCrumb';
import { CatalogMaker } from '../MultipurposeComponents/CatalogMaker/catalogMaker';
import { ItemsSorting } from '../MultipurposeComponents/ItemsSorting/itemsSorting';

export const PhonesCatalog = () => {
  const [phones, setPhones] = useState([]);
  const [sort, setSort] = useState('age');
  const [viewQty, setViewQty] = useState(4);
  const [position, setPosition] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const dataFromServer = useContext(DFS);


  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { type: string }) => el.type === 'phone'))
      .then(data => setPhones(data));
  }, [dataFromServer]);

  const getSortedItems = (query: string) => {
    if (query === 'age') {
      return phones.sort((a: { age: number },
        b: { age: number }) => a.age - b.age);
    }

    if (query === 'name') {
      return phones
        .sort((a: { name: string },
          b: { name: string }) => a.name.localeCompare(b.name));
    }

    if (query === 'price_asc') {
      return phones.sort((a: { price: number },
        b: { price: number }) => a.price - b.price);
    }

    if (query === 'price_desc') {
      return phones.sort((a: { price: number },
        b: { price: number }) => b.price - a.price);
    }

    return undefined;
  };


  const sortedPhones = getSortedItems(sort);


  return (
    <div className="PhonesCatalog">
      <BreadCrumb page="Phones" />
      <h1 className="PhonesCatalog__header">Mobile phones</h1>
      <p className="PhonesCatalog__qty">
        {phones.length}
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
          {sortedPhones && <CatalogMaker gadgets={sortedPhones} />}
        </div>
      </div>
      {sortedPhones && sortedPhones.length > viewQty ? (
        <div className="PhonesCatalog__navigation">
          <NavBar
            sortedPhones={sortedPhones}
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
