import { useSearchParams } from 'react-router-dom';

export const NoSearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <h1>
      {`No result found for "${query}"`}
    </h1>
  );
};
