import { Link, useSearchParams, useLocation } from 'react-router-dom';
import mobilePageStyles from './MobilePhones.module.scss';
import { useEffect, useMemo, useState } from 'react';
import ListOfGadgets from '../ListOfGadgets';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import { debounce } from '../ListOfGadgets/debounce';
import { Products } from '../../types/types';

const MobilePhones: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [apliedQuery, setApliedQuery] = useState('');
  const [typeOfGadgets, setTypeOfGadgets] = useState<Products[] | []>([]);

  const aplyQuery = debounce(setApliedQuery, 1000);

  const gadgets = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location.pathname]);

  const [currentPagePag, setCurrentPagePag] = useState<number>(() => {
    const savedValue = sessionStorage.getItem(`currentPage-${gadgets}`) || 1;

    return +savedValue;
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPagePag]);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          (item: Products) => item.category === gadgets,
        );

        setTypeOfGadgets(filtered);
      });
  }, [gadgets]);

  function handleSortChange(sort: string) {
    const newParams = new URLSearchParams(searchParams);

    setCurrentPagePag(1);
    sessionStorage.setItem(`currentPage-${gadgets}`, '1');

    newParams.set('sort', sort);
    setSearchParams(newParams.toString());
  }

  function handleItemsChange(perItems: string) {
    const newParams = new URLSearchParams(searchParams);

    setCurrentPagePag(1);
    sessionStorage.setItem(`currentPage-${gadgets}`, '1');

    newParams.set('quantity', perItems);
    setSearchParams(newParams.toString());
  }

  const currentPage =
    gadgets === 'phones'
      ? 'phones'
      : gadgets === 'accessories'
        ? 'accessories'
        : 'tablets';

  function handleQueryChange(param: string) {
    aplyQuery(param);
    setCurrentPagePag(1);
    sessionStorage.setItem(`currentPage-${gadgets}`, '1');
    const newParams = new URLSearchParams(searchParams);

    newParams.set('query', param);
    setSearchParams(newParams);

    if (newParams.get('query') === '') {
      newParams.delete('query');
      setSearchParams(newParams);
    }
  }

  const currentParams = new URLSearchParams(searchParams);

  return (
    <>
      <HeaderLogoMenu />

      <div className={mobilePageStyles['mobile-page']}>
        <div className={mobilePageStyles['mobile-page__path-of-user']}>
          <Link
            to="/"
            className={mobilePageStyles['mobile-page__go-home']}
          ></Link>
          <span className={mobilePageStyles['mobile-page__direction']}></span>
          <Link
            to={`/${gadgets}?quantity=16&sort=newest`}
            className={mobilePageStyles['mobile-page__current-page']}
          >
            {currentPage}
          </Link>
        </div>
        {currentPage === 'phones' ? (
          <h1>Mobile {currentPage}</h1>
        ) : (
          <h1 className={mobilePageStyles['mobile-page__title']}>
            {currentPage}
          </h1>
        )}

        <span className={mobilePageStyles['mobile-page__quantity-mobils']}>
          {typeOfGadgets.length} models
        </span>

        <div className={mobilePageStyles['mobile-page__select-wrapper']}>
          <div className={mobilePageStyles['mobile-page__input-wrapper']}>
            <div>
              <label
                htmlFor="gadgets-seek-for"
                className={mobilePageStyles['mobile-page__items-sort']}
              >
                Seek for
              </label>
              <input
                name="search"
                id="gadgets-seek-for"
                data-cy="NameFilter"
                type="search"
                className={mobilePageStyles['mobile-page__input']}
                placeholder="Search"
                value={currentParams.get('query') || ''}
                onChange={e => handleQueryChange(e.target.value)}
              />
            </div>

            <div className={mobilePageStyles['mobile-page__sort-wrapper']}>
              <label
                htmlFor="gadgets-sort"
                className={mobilePageStyles['mobile-page__items-sort']}
              >
                Sort by
              </label>
              <select
                name="gadgets"
                id="gadgets-sort"
                className={`${mobilePageStyles['mobile-page__items-options']} ${mobilePageStyles['mobile-page__items-options--hot']}`}
                onChange={event => {
                  handleSortChange(event.target.value);
                }}
                value={searchParams.get('sort') || 'newest'}
              >
                <option value="newest">Newest</option>
                <option value="alphabetically">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="quantity-option"
              className={mobilePageStyles['mobile-page__items-sort']}
            >
              Items on page
            </label>

            <select
              name="quantity"
              id="quantity-option"
              className={mobilePageStyles['mobile-page__items-options']}
              onChange={event => {
                handleItemsChange(event.target.value);
              }}
              value={currentParams.get('quantity') || '16'}
            >
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="4">4</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>

      <ListOfGadgets
        gadgets={gadgets}
        setCurrentPage={setCurrentPagePag}
        currentPage={currentPagePag}
        apliedQuery={apliedQuery}
      />
    </>
  );
};

export default MobilePhones;
