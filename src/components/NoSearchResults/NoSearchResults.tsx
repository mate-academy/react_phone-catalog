import noSearchResult from '../../assets/icons/NoSearchResult.svg';
import './NoSearchResults.scss';

export const NoSearchResults = () => {
  return (
    <div className="no-result">
      <div className="no-result__wrap">
        <img src={noSearchResult} alt="No Search Result" />

        <p className="no-result__empty">No results found!</p>
      </div>
    </div>
  );
};
