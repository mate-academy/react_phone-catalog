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
import { useEffect } from 'react';
import ListOfGadgets from '../ListOfGadgets';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import { useMenu } from '../../context/MenuContext';

interface Props {
  gadgets: string;
}

const MobilePhones: React.FC<Props> = ({ gadgets }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const search = useLocation();

  console.log(search.pathname);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);

    newParams.set('quantity', '16');
    newParams.set('sort', 'newest');
    setSearchParams(newParams.toString());
  }, [searchParams, setSearchParams]);

  function handleSortChange(sortBy: string) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', sortBy);
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
  // console.log(searchParams.toString);

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
            to={`/${gadgets}`}
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

        <div className={mobilePageStyles['mobile-page__select-wrapper']}>
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
              defaultValue={'newest'}
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
              defaultValue={'16'}
            >
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="4">4</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>

      <ListOfGadgets gadgets={gadgets} />
    </>
  );
};

export default MobilePhones;
