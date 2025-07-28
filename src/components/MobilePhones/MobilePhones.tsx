import {
  Routes,
  Route,
  Link,
  useSearchParams,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import mobilePageStyles from './MobilePhones.module.scss';
import { useEffect, useState } from 'react';
import ListOfGadgets from '../ListOfGadgets';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import { useMenu } from '../../context/MenuContext';

interface Props {
  gadgets: string;
}

const MobilePhones: React.FC<Props> = ({ gadgets }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPagePag, setCurrentPagePag] = useState<number>(1);

  const sortBy = searchParams.get('sort');
  const quantity = searchParams.get('quantity');

  const { isMenuOpen, setIsMenuOpen } = useMenu();
  // const [sortParams, setSortParams] = useState(['newest', '16']);
  const search = useLocation();

  console.log(search.pathname);
  console.log(search.pathname);
  console.log(search.pathname);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);

    newParams.set('quantity', '16');
    newParams.set('sort', 'newest');
    setSearchParams(newParams.toString());
  }, [search.pathname]);

  function handleSortChange(sort: string) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', sort);
    setSearchParams(newParams.toString());

    console.log(newParams.toString());
  }

  function handleItemsChange(perItems: string) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('quantity', perItems);
    setSearchParams(newParams.toString());

    console.log(newParams.toString());
  }

  const currentPage =
    gadgets === 'phones'
      ? 'phones'
      : gadgets === 'accessories'
        ? 'accessories'
        : 'tablets';

  // console.log(search.pathname);
  // console.log(gadgets);
  function handleQueryChange(param: string) {
    setCurrentPagePag(1);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('query', param);
    setSearchParams(newParams);

    if (newParams.get('query') === '') {
      newParams.delete('query');
      setSearchParams(newParams);
    }
  }

  const currentParams = new URLSearchParams(searchParams);

  console.log(searchParams.toString);
  console.log(currentParams.get('query') || '');

  return (
    <>
      <HeaderLogoMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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
          95 models
        </span>

        <div className={mobilePageStyles['mobile-page__select-wrapper']} >
          {/* <p className={mobilePageStyles['mobile-page__input-wrapper']}>
          </p> */}
          <div className="">
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
              onChange={e => handleQueryChange(e.target.value)}
            />
          </div>

          {/* <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span> */}

          <div>
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
              value={searchParams.get('quantity') || '16'}
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
      />
    </>
  );
};

export default MobilePhones;
