import { useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const Dropdowns = () => {
  const typeOptions = [
    {
      name: 'Newest',
      type: 'age',
    }, {
      name: 'Alphabetically',
      type: 'name',
    }, {
      name: 'Cheapest',
      type: 'price',
    }];

  const quantityOptions = ['4', '8', '16', 'all'];

  const [typeButton, setTypeButton] = useState(false);
  const [typeTitle, setTypeTitle] = useState(typeOptions[0].name);
  const [quantityButton, setQuantityButton] = useState(false);
  const [quantityTitle, setQuantityTitle] = useState(quantityOptions[3]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';

  const handleSort = (value: string) => {
    const page = searchParams.get('page') || '';
    const perPageValue = searchParams.get('perPage') || '';
    const query = searchParams.get('query') || '';
    // eslint-disable-next-line
    const params: any = {};

    params.sort = value;

    if (page) {
      params.page = page;
      params.perPage = perPageValue;
    }

    if (query) {
      params.query = query;
    }

    setSearchParams(params);
  };

  const handlePagination = (value: string) => {
    const sortValue = searchParams.get('sort') || '';
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('query') || '';
    // eslint-disable-next-line
    const params: any = {};

    if (sort) {
      params.sort = sortValue;
    }

    if (page) {
      params.page = page;
    }

    params.perPage = value;

    if (query) {
      params.query = query;
    }

    setSearchParams(params);
  };

  return (
    <div className="dropdown__container">
      <div className="sorted-slider__input-container">
        <div className="sorted-slider__input-title">Sort by</div>

        <div className="dropdown">
          <button
            type="button"
            className={classNames('dropdown__button',
              { 'dropdown__button--active': typeButton })}
            onClick={() => {
              setTypeButton(!typeButton);
            }}
          >
            <div className="dropdown__button-title">{sort || typeTitle}</div>
            <div className="dropdown__button-arrow" />
          </button>
          <div className="dropdown__list-container">
            <div className="dropdown__list">
              {typeOptions.map((option) => (
                <button
                  value={sort}
                  key={option.name}
                  type="button"
                  name={option.type}
                  className="dropdown__item"
                  onClick={() => {
                    handleSort(option.type);
                    setTypeButton(false);
                    setTypeTitle(option.name);
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sorted-slider__input-container">
        <div className="sorted-slider__input-title">Items on page</div>

        <div className="dropdown">
          <button
            type="button"
            className={classNames('dropdown__button',
              { 'dropdown__button--active': quantityButton })}
            onClick={() => {
              setQuantityButton(!quantityButton);
            }}
          >
            <div className="dropdown__button-title">{quantityTitle}</div>
            <div className="dropdown__button-arrow" />
          </button>
          <div className="dropdown__list-container">
            <div className="dropdown__list">
              {quantityOptions.map((option) => (
                <button
                  value={perPage}
                  key={option}
                  type="button"
                  className="dropdown__item"
                  onClick={() => {
                    handlePagination(option);
                    setQuantityButton(false);
                    setQuantityTitle(option);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
