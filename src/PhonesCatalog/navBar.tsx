import React, { FC } from 'react';
import cn from 'classnames';
import { Phones } from '../Additionals/interfaces';
import { ARROW_UP } from '../Additionals/additional_api';

type Params = {
  sortedPhones: Phones[];
  activeTab: number;
  viewQty: number;
  setActiveTab: (value: number) => void;
  setPosition: (value: number) => void;
  position: number;
};

export const NavBar: FC<Params> = ({
  sortedPhones,
  activeTab,
  viewQty,
  setActiveTab,
  setPosition,
  position,
}) => {
  const handleClickTab = (el: number) => {
    setPosition((el - 1) * ((viewQty / 4) * 507));
    setActiveTab(el);
  };

  const handlePrevTab = () => {
    const step = (viewQty / 4) * 507;

    setPosition(position - step <= 0
      ? 0
      : position - step);

    setActiveTab(activeTab <= 1
      ? 1
      : activeTab - 1);
  };


  const handleNextTab = () => {
    const stepQty = Math.ceil(sortedPhones?.length / viewQty) - 1;
    const step = (viewQty / 4) * 507;

    setPosition(position + step <= stepQty * step
      ? position + step
      : position);
    setActiveTab(activeTab <= stepQty
      ? activeTab + 1
      : activeTab);
  };


  const buttonQty = Math.ceil(sortedPhones.length / viewQty);
  const tabs = [...sortedPhones].splice(0, buttonQty);


  return (
    <>
      <button
        onClick={handlePrevTab}
        type="button"
        className="PhonesCatalog__navigation_button"
      >
        <img
          src={ARROW_UP}
          alt="move left"
          className="PhonesCatalog__navigation_button-left"
        />
      </button>
      <div>
        {tabs.map((el, index) => (
          <button
            type="button"
            onClick={() => handleClickTab(index + 1)}
            key={el.id}
            className={cn(activeTab === index + 1
              ? 'PhonesCatalog__navigation_button'
              + ' PhonesCatalog__navigation_tabs'
              + ' PhonesCatalog__navigation_tabs-active'
              : 'PhonesCatalog__navigation_button'
              + ' PhonesCatalog__navigation_tabs')}
            disabled={index + 1 === activeTab}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextTab}
        type="button"
        className="PhonesCatalog__navigation_button"
      >
        <img
          src={ARROW_UP}
          alt="move right"
          className="PhonesCatalog__navigation_button-right"
        />
      </button>
    </>
  );
};
