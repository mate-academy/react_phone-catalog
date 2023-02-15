import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import './NoSearchResults.scss';

export const NoSearchResults: React.FC = () => {
  const [seachParams, setSearchParams] = useSearchParams();

  return (
    <div className="noSearchResults__products">
      <h2 className="noSearchResults__title">
        Ooops!
      </h2>

      <p
        className="noSearchResults__message"
      >
        We can not find this product!
      </p>

      <button
        className="noSearchResults__button"
        type="button"
        onClick={() => {
          setSearchParams(getSearchWith(seachParams, {
            query: null,
          }));
        }}
      >
        Reset your search
      </button>
    </div>
  );
};
