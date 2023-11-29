import { useSearchParams } from 'react-router-dom';
import magnifyingGlass from '../../images/Search.svg';
import './Search.scss';

type Props = {
  placeholder: string
};

export const Search: React.FC<Props> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  return (
    <label htmlFor="search" className="search">
      <input
        type="text"
        placeholder={placeholder}
        className="search__input"
        id="search"
        onChange={handleQueryChange}
        value={query}
      />
      <img
        src={magnifyingGlass}
        alt="magnifying glass"
        className="search__img"
      />
    </label>
  );
};
