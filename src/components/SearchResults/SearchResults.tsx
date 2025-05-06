import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

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
    // Here we sort and filter our data
    // Example: fetchResults({ query, page, category, sort });
  }, [query, page, category, sort]);

  return (
    <div className="search-page__wrapper">
      <h1>HERE PLACE YOUR SEARCH RES</h1>
      <h2>Results for: &quot;{query}&quot;</h2>
      <p>Page: {page}</p>
      <p>Category: {category}</p>
      <p>Sort: {sort}</p>

      {/* Render actual results here */}

      <select onChange={e => updateSearchParam('sort', e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="price_low_high">Price: Low to High</option>
      </select>

      <button onClick={() => updateSearchParam('page', `${page + 1}`)}>Next Page</button>
    </div>
  );
};
