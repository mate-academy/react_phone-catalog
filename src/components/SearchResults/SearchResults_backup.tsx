import './SearchResults.scss';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites }
  from '../../redux/favoritesSlice';
import phonesJSON from '../../../public/api/phones.json';
import tabletsJSON from '../../../public/api/tablets.json';
import accessoriesJSON from '../../../public/api/accessories.json';
import productsJSON from '../../../public/api/products.json';
import { Phone, useProductState } from '../Phones/Phones';
import { Accessory } from '../Accessories/Accessories';
import { Tablet } from '../Tablets/Tablets';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWindowWidth } from '../Navbar/Navbar';
import { emptyHeart, filledHeart, arrowLeft, arrowRight } from '../../../public/img/icons/svg_icons';

export const SearchResults: React.FC = (itemsCategory: string) => {
  const navigate = useNavigate();
  const [serResQty, setSerResQty] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '8', 10);
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'relevance';
  const { isInCart, isInFavorites } = useProductState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();


  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    navigate(`/search?${params.toString()}`);
  };

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(key, value);
    if (key !== 'page') {
      newParams.set('page', '1');
    }  // Reset page when changing filters/sort

    navigate(`/search?${newParams.toString()}`);
  };

  useEffect(() => {
    // Here we sort and filter our data if it were from server
    // Example: fetchResults({ query, page, category, sort });
    // in our demo there are no backend for this
  }, [query, page, category, sort]);

  const phones = ((phonesJSON));
  const tablets = ((tabletsJSON));
  const accessories = ((accessoriesJSON));
  const allProducts = phones.concat(tablets, accessories);

  function convertItemObject(itemObject) {
    const result = productsJSON.find(item => item.itemId === itemObject.id);

    return result;
  }

  function containsSubstring(stringsArray, substring) {
    return stringsArray.some(str =>
      typeof str === 'string' && str.toLowerCase()
        .includes(String(substring).toLowerCase()),
    );
  }

  function getAllValuesExtended(obj, result = []) {
    const ignoredKeys = ['colorsAvailable', 'capacityAvailable'];

    if (obj === null || obj === undefined) {
      return result;
    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      Object.entries(obj).forEach(([key, value]) => {
        // Skip ignored keys
        if (ignoredKeys.includes(key)) {
          return;
        }

        if (value && typeof value === 'object') {
          // Recursively process nested objects and arrays
          getAllValuesExtended(value, result);
        } else {
          result.push(value);
        }
      });
    }
    // Process arrays
    else if (Array.isArray(obj)) {
      obj.forEach(item => {
        if (item && typeof item === 'object') {
          // Recursively process object or array items
          getAllValuesExtended(item, result);
        } else {
          result.push(item);
        }
      });
    }
    // Add primitive values directly
    else {
      result.push(obj);
    }

    return result;
  }

  const filteredItems = () => {
    let preparedItems = allProducts;
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;

    // paginatedItems = paginatedItems.slice(startIndex, startIndex + 16);

    if (query.length === 0) {
      if (serResQty !== preparedItems.length) {
        setSerResQty(preparedItems.length);
      }

      return preparedItems.slice(startIndex, startIndex + perPage);
    }

    preparedItems = preparedItems.filter((sub) => {
      return containsSubstring(getAllValuesExtended(sub), query);
    });

    if (serResQty !== preparedItems.length) {
      setSerResQty(preparedItems.length);
    }

    return preparedItems.slice(startIndex, startIndex + perPage);
  };

  const GeneratePaginationButtons = () => {
    const buttonList = [];
    const lastPI = Math.ceil(serResQty / perPage);

    if (true) {
      buttonList.push(
        <button
          key='sr__pgnntbtnfirstpage'
          onClick={() => updateSearchParam('page', '1')}
          disabled={page === 1}
          className='sr__pbtn rec__item-to-fav'
        >{'1'}</button>,
      );
    }

    if (page >= 4 && windowWidth >= 360) {
      buttonList.push(
        <button
          key='sr__pgnntbtnprev3dot'
          className='sr__pbtn rec__item-to-fav'
        >{page == 4 ? '2' : '...'}</button>,
      );
    }

    if (page - 1 > 1 && lastPI > 2) {
      buttonList.push(
        <button
          key='sr__pgnntbtnprevpage'
          onClick={() => updateSearchParam('page', `${page - 1}`)}
          className='sr__pbtn rec__item-to-fav'
        >{windowWidth >= 360 ? page - 1 : arrowLeft}</button>,
      );
    }

    if (lastPI > 2 && ![1, lastPI].includes(page)) {
      buttonList.push(
        <button
          key='sr__pgnntbtnmainpage'
          className='sr__pbtn rec__item-to-fav'
          disabled
        >{page}</button>,
      );
    }

    if (page + 1 < lastPI && lastPI > 2) {
      buttonList.push(
        <button
          key='sr__pgnntbtnnextpage'
          onClick={() => updateSearchParam('page', `${page + 1}`)}
          className='sr__pbtn rec__item-to-fav'
        >{windowWidth >= 360 ? page + 1 : arrowRight}</button>,
      );
    }

    if (lastPI - 3 != 1 && page < lastPI - 2 && windowWidth >= 360) {
      buttonList.push(
        <button
          key='sr__pgnntbtnlast3dot'
          className='sr__pbtn rec__item-to-fav'
        >{lastPI - page > 3 ? '...' : lastPI - 1}</button>,
      );
    }

    if (lastPI >= 2) {
      buttonList.push(
        <button
          key='sr__pgnntbtnlastpage'
          onClick={() => updateSearchParam('page', `${lastPI}`)}
          disabled={page === lastPI}
          className='sr__pbtn page-back rec__item-to-fav'
        >{lastPI}</button>,
      );
    }

    return (
      <div className="sr__pg-btns">
        {windowWidth >= 640 && (
          <button
            key='sr__hlprbuttnleft'
            onClick={() => updateSearchParam('page', `${page - 1}`)}
            disabled={page === 1}
            className='sr__pbtn page-back rec__item-to-fav'
          >{arrowLeft}</button>
        )}
        <div className="sr__pg-btns">
          {buttonList}
        </div>
        {windowWidth >= 640 && (
          <button
            key='sr__hlprbuttnright'
            onClick={() => updateSearchParam('page', `${page + 1}`)}
            disabled={page === Math.ceil(serResQty / perPage)}
            className='sr__pbtn page-forward rec__item-to-fav'
          >{arrowRight}</button>
        )}
      </div>
    );
  };

  return (
    <div className="search-page__wrapper">
      <h2>Search results for: &quot;{query}&quot;</h2>
      <p>Search res quantity - {serResQty}</p>
      <p>Current Page: {page} of {Math.ceil(serResQty / perPage)}</p>
      <p>Category: {category}</p>
      <p>Sort: {sort}</p>
      all items = {allProducts.length}

      {/* Render actual results here */}

      <select onChange={e => updateSearchParam('sort', e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="price_low_high">Price: Low to High</option>
      </select>

      <select
        onChange={e => updateSearchParam('perPage', e.target.value)}
        value={perPage}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="24">24</option>
      </select>

      <div className="sr__dvdr" />
      {GeneratePaginationButtons()}

      <br/>
      <div className="asdasdasdsad">
        {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
        {/*       {filteredItems().map((item: any) => (
                <div className="card" key={`${item.id}+++${item.namespaceId}`}>
                  <Link
                    to={`/${item.category}/${item.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <img
                      src={`../../../public/${item?.images[0]}`}
                      alt="here should be an image"
                      height="300"
                    />
                    <br/>
                    {`${item.name}`}
                  </Link>
                  <br />
                  {`${item.priceDiscount} $`} &emsp;<s>{`${item.priceRegular} $`}</s>
                  <br />
                  Screen &emsp;{`${item.screen}`}
                  <br />
                  Capacity &emsp;{`${item.capacity}`}
                  <br />
                  RAM &emsp;{`${item.ram}`}
                  <br />
                  <br />
                  <br />
                </div>
              ))} */}
        {/*                 {filteredItems().map((item, index) => (
                  <div
                    key={`${item.id}+recommended+${index}`}
                    className={`rec__card`}

                  >
                    <Link
                      to={`/${item.category}/${item.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className='rec__link'
                    >
                      <img
                        src={`../../../public/${item.images[0]}`}
                        alt="here should be an image"
                        className='fav__item-image'
                      />
                      <div className="rec__item-name">
                        {item.name}
                      </div>
                    </Link>
                    <div className="rec__item-price">
                      {`$${item.priceDiscount}  `}

                    </div>
                    <div className="rec__specs">
                      <div className="rec__specs-spec">
                        Screen<div className="rec__specs-value">{item.screen}</div>
                      </div>
                      <div className="rec__specs-spec">
                        Capacity<div className="rec__specs-value">{item.capacity.replace('GB', ' GB')}</div>
                      </div>
                      <div className="rec__specs-spec">
                        RAM<div className="rec__specs-value">{item.ram.replace('GB', ' GB')}</div>
                      </div>
                    </div>
                    <div className="rec__item-buttons">
                      <button className={`rec__item-to-cart ${isInCart(item?.id) ? 'in-cart' : ''}`}
                        onClick={() => isInCart(item?.id)
                          ? dispatch(removeFromCart(item?.id))
                          : dispatch(addToCart(item))
                        }>{`${isInCart(item?.id) ? 'In cart' : 'Add to cart'}`}</button>
                      <button className={`rec__item-to-fav ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
                        onClick={() => isInFavorites(item?.id)
                          ? dispatch(removeFromFavorites(item?.id))
                          : dispatch(addToFavorites(item))
                        }>{isInFavorites(item?.id)
                          ? filledHeart
                          : emptyHeart
                        }
                      </button>
                    </div>
                  </div>
                ))} */}
      </div>

      <div className="sr__crdcnt">
        {filteredItems().map(item => (
          <div
            key={`${item.id}+`}
            className={'rec__card fav_card sr__icrd'}

          >
            <Link
              to={`/phones/${item.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className='rec__link fav__itemImage'
            >
              <img
                src={`../../../public/${item.images[0]}`}
                alt="here should be an image"
              />
              <div className="rec__item-name">
                {item.name}
              </div>
            </Link>
            <div className="sr__prcnt">
              <div className="rec__item-price">
                {`$${item.priceDiscount}  `}
              </div>
              <div className="rec__item-price price-regular">
                {`$${item.priceRegular}  `}
              </div>
            </div>

            <div className="rec__specs">
              <div className="rec__specs-spec">
                Screen<div className="rec__specs-value">{item.screen}</div>
              </div>
              <div className="rec__specs-spec">
                Capacity<div className="rec__specs-value">
                  {item.capacity.replace('GB', ' GB')}</div>
              </div>
              <div className="rec__specs-spec">
                RAM<div className="rec__specs-value">
                  {item.ram.replace('GB', ' GB')}</div>
              </div>
            </div>
            <div className="rec__item-buttons fav__buttons">
              <button className={`rec__item-to-cart ${isInCart(convertItemObject(item).id) ? 'in-cart' : ''}`}
                onClick={() => isInCart(convertItemObject(item).id)
                  ? dispatch(removeFromCart(convertItemObject(item).id))
                  : dispatch(addToCart(convertItemObject(item)))
                }>{`${isInCart(convertItemObject(item).id) ? 'In cart' : 'Add to cart'}`}</button>
              <button className={`rec__item-to-fav ${isInFavorites(convertItemObject(item).id) ? 'in-favorites' : ''}`}
                onClick={() => isInFavorites(convertItemObject(item).id)
                  ? dispatch(removeFromFavorites(convertItemObject(item).id))
                  : dispatch(addToFavorites(convertItemObject(item)))
                }>{isInFavorites(convertItemObject(item).id)
                  ? filledHeart
                  : emptyHeart
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="sr__dvdr" />
      {GeneratePaginationButtons()}

    </div>
  );
};
