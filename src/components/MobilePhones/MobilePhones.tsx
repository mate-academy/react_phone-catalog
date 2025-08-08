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
import { debounce } from '../ListOfGadgets/debounce';
import { Products } from '../../types/types';

const MobilePhones: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPagePag, setCurrentPagePag] = useState<number>(1);
  const location = useLocation();
  const [apliedQuery, setApliedQuery] = useState('');
  const [typeOfGadgets, setTypeOfGadgets] = useState<Products[] | []>([]);
  const aplyQuery = debounce(setApliedQuery, 1000);

  console.log(location);

  const gadgets = location.pathname.split('/')[1];

  console.log(gadgets);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPagePag]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => {
        // Фільтруємо тільки потрібну категорію
        const filtered = data.filter(
          (item: Products) => item.category === gadgets,
        );

        // console.log(filtered);

        setTypeOfGadgets(filtered);
      });
  }, [gadgets]);

  const sortBy = searchParams.get('sort');
  const quantity = searchParams.get('quantity');

  const { isMenuOpen, setIsMenuOpen } = useMenu();

  // useEffect(() => {
  //   const newParams = new URLSearchParams(location.search);

  //   newParams.set('quantity', '16');
  //   newParams.set('sort', 'newest');
  //   setSearchParams(newParams.toString());
  // }, [location.pathname, location.search, setSearchParams]);

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
    console.log(param);

    aplyQuery(param);
    setCurrentPagePag(1);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('query', param);
    setSearchParams(newParams);

    if (newParams.get('query') === '') {
      newParams.delete('query');
      setSearchParams(newParams);
      // aplyQuery(newParams.toString());
    }
  }

  const currentParams = new URLSearchParams(searchParams);

  console.log(searchParams.toString);
  console.log(currentParams.get('query') || '');
  console.log(currentParams.get('sort') || '');
  console.log(currentParams.get('quantity') || 16);

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
          {/* <p className={mobilePageStyles['mobile-page__input-wrapper']}>
          </p> */}
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

          {/* <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span> */}

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
