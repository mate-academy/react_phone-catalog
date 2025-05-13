import { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import phonesJSON from '../../../public/api/phones.json';
import tabletsJSON from '../../../public/api/tablets.json';
import accessoriesJSON from '../../../public/api/accessories.json';
import { Phone } from '../Phones/Phones';
import { Accessory } from '../Accessories/Accessories';
import { Tablet } from '../Tablets/Tablets';

export const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'relevance';
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
  }, [query, page, category, sort]);

  const phones = ((phonesJSON));
  const tablets = ((tabletsJSON));
  const accessories = ((accessoriesJSON));
  const allProducts = phones.concat(tablets, accessories);

  function containsSubstring(stringsArray, substring) {
    return stringsArray.some(str =>
      typeof str === 'string' && str.includes(String(substring)),
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
    if (query.length === 0) {
      return allProducts;
    }

    return allProducts.filter((sub) => {
      return containsSubstring(getAllValuesExtended(sub), query);
    });
  };

  return (
    <div className="search-page__wrapper">
      <h1>HERE PLACE YOUR SEARCH RES</h1>
      <h2>Results for: &quot;{query}&quot;</h2>
      <p>Page: {page}</p>
      <p>Category: {category}</p>
      <p>Sort: {sort}</p>
      all items = {allProducts.length}

      {/* Render actual results here */}

      <select onChange={e => updateSearchParam('sort', e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="price_low_high">Price: Low to High</option>
      </select>

      <button onClick={() => updateSearchParam('page', `${page + 1}`)}>Next Page</button>
      <br/>
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      {filteredItems().map((item: any) => (
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
      ))}
    </div>
  );
};
