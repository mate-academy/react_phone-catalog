import { useSearchParams } from 'react-router-dom';
import './NoSearchResults.scss';

export const NoSearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <div className="no-result">
      <h1 className="no-result__title">{`No results found for "${query}"`}</h1>
      <div className="no-result__img" />
    </div>
  );
};
