import React from 'react';
import Filter from './Filter/FIlter';
import { PageType } from 'src/types/PageType';
import './gadgetsPageStyles.scss';
import Card from '../ui/Card/Card';
import Navigation from './Navigation/Navigation';

interface Props {
  type: PageType;
}

const GadgetsPage: React.FC<Props> = ({ type }) => {
  return (
    <div className="gadgets">
      <div className="gadgets__header">
        <div className="gadgets__header--wrapper container">
          <div className="gadgets__adress">
            <img
              src="icons/Home.svg"
              alt="home"
              className="gadgets__adress--home"
            />
          </div>
          <h1 className="gadgets__title">{type}</h1>
          <div className="gadgets__sub-title"></div>
          <div className="gadgets__filter">
            <Filter title="sort by" items={['newest', 'latest']} />
            <Filter
              title="items on page"
              items={['16', '14', '12', '10', '8']}
            />
          </div>
        </div>
      </div>
      <div className="gadgets__main container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="gadgets__footer navigation">
        <Navigation />
      </div>
    </div>
  );
};

export default GadgetsPage;
