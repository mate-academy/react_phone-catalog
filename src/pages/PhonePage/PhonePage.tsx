/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import NavMain from '../../components/NavMain/NavMain';
import {
  ButtonPaginationCount,
  ButtonPaginationLeft,
  ButtonPaginationRight,
} from '../../components/Buttons/Button';

const PhonePage: React.FC = () => {
  return (
    <div className="container">
      <div className="phones">
        <div className="phones__top">
          <NavMain />
        </div>

        <h1 className="phones__title">Mobile phones</h1>

        <span className="phones__models">95 models</span>

        <label htmlFor="sortBy" className="phones__label phones__label-sort">
          Sort by
          <select value="Newest" className="phones__select" id="sortBy">
            <option className="phones__option" value="Newest" id="1">
              Newest
            </option>

            <option className="phones__option" value="Alphabetically" id="2">
              Alphabetically
            </option>

            <option className="phones__option" value="Cheapest" id="3">
              Cheapest
            </option>
          </select>
        </label>

        <label
          htmlFor="countProduct"
          className="phones__label phones__label-items"
        >
          Items on page
          <select value="" className="phones__select" id="countProduct">
            <option className="phones__option" value="4" id="">
              4
            </option>

            <option className="phones__option" value="8" id="">
              8
            </option>

            <option className="phones__option" value="16" id="">
              16
            </option>

            <option className="phones__option" value="all" id="">
              All
            </option>
          </select>
        </label>

        <div className="phones__block"></div>

        <div className="phones__pagination">
          <ButtonPaginationLeft />

          <ButtonPaginationCount />
          <ButtonPaginationCount />
          <ButtonPaginationCount />

          <ButtonPaginationRight />
        </div>
      </div>
    </div>
  );
};

export default PhonePage;
