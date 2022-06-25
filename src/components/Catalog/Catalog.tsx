import { LinearProgress } from '@mui/material';
import React,
{
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { Item } from '../../types';
import NoResults from '../NoResults/NoResults';
import { StateContext } from '../../StateProvider';

import Pagination from '../Pagination/Pagination';
import './Catalog.scss';
import CatalogList from '../CatalogList/CatalogList';

type Props = {
  type: string;
  title: string;
  link: string;
};

const Catalog: React.FC<Props> = ({ type, title, link }) => {
  const { appliedQuery } = useContext(StateContext);

  const [items, setItems] = useState<Item[] | null>(null);
  const [sortBy, setSortBy] = useState('Newest');
  const [itemOnPage, setItemOnPage] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [openPagination, setOpenPagination] = useState(false);

  const history = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const sortByValue = searchParams.get('sortBy') || 'age';
  const countValue = searchParams.get('count') || '0';

  const handleGetItems = async () => {
    try {
      const response = await getProducts();

      if (response.status === 200) {
        const allPhones = response.data;

        const dataWithPhones
          = allPhones.filter((item: Item) => item.type === type);

        setItems(dataWithPhones);
      }
    } catch {
      throw new Error('error');
    }
  };

  const handlePage = (value: number) => {
    setPage(value);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);

    if (value !== 'age') {
      searchParams.set('sortBy', value);
    } else {
      searchParams.delete('sortBy');
    }

    history(`?${searchParams.toString()}`);
  };

  const handleCount = (value: string) => {
    setItemOnPage(+value);

    if (value !== '0') {
      searchParams.set('count', value);
    } else {
      searchParams.delete('count');
    }

    history(`?${searchParams.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (event.target.name) {
      case 'bySort':
        handleSortBy(value);
        break;

      case 'itemCount':

        handleCount(value);
        break;
      default: break;
    }
  };

  useEffect(() => {
    handleGetItems();
    handleSortBy(sortByValue);
    handleCount(countValue);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [itemOnPage]);

  const getVisibleItems = () => {
    if (!items) {
      return [];
    }

    let visibleItems = items.filter(item => {
      const name = item.name.toLocaleLowerCase();

      return name.includes(appliedQuery.toLocaleLowerCase());
    });

    const countItems = visibleItems.length || 0;
    const from = page * itemOnPage - itemOnPage;
    const to = page * itemOnPage > countItems
      ? countItems : page * itemOnPage - 1;

    visibleItems = visibleItems.sort((i1: Item, i2: Item) => {
      switch (sortBy) {
        case 'price':
        case 'age':
          return i1[sortBy] - i2[sortBy];

        case 'name':
          return i1[sortBy].localeCompare(i2[sortBy]);

        default:
          return 0;
      }
    });

    setCount(visibleItems.length);

    visibleItems = visibleItems.filter((_, ind: number) => {
      if (itemOnPage === 0 || (ind >= from && ind <= to)) {
        return true;
      }

      return false;
    });

    setOpenPagination(!!countItems && !!itemOnPage && itemOnPage < countItems);

    return visibleItems;
  };

  const visibleItems = useMemo(
    getVisibleItems,
    [items, appliedQuery, sortBy, itemOnPage, page],
  );

  if (items === null) {
    return (
      <LinearProgress color="inherit" />
    );
  }

  if (visibleItems.length === 0) {
    return (
      <NoResults link={link} title={title} />
    );
  }

  return (
    <section className="catalog container">
      <div className="catalog__btn-wrap">
        <NavLink to="/home">
          <div className="catalog__go-to-home" />
        </NavLink>

        <div className="catalog__arrow" />
        <span className="catalog__btn-text">{link}</span>
      </div>

      <h2 className="catalog__title">{title}</h2>
      <h4 className="catalog__subtitle">
        {`${items.length} models`}
      </h4>

      <div className="catalog__params">
        <div className="catalog__param">
          <div className="catalog__param-title">Sort by</div>
          <select
            className="catalog__select"
            name="bySort"
            value={sortBy}
            onChange={(event) => {
              handleChange(event);
            }}
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className="catalog__param">
          <div className="catalog__param-title">Items on page</div>
          <select
            className="catalog__select"
            name="itemCount"
            value={itemOnPage}
            onChange={(event) => handleChange(event)}
          >
            <option value="0">all</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <NoResults link={link} title={title} />
      ) : (
        <CatalogList visibleItems={visibleItems} />
      )}

      {openPagination && (
        <Pagination
          countItems={count}
          itemOnPage={itemOnPage}
          page={page}
          handlePage={handlePage}
        />
      )}
    </section>
  );
};

export default Catalog;
