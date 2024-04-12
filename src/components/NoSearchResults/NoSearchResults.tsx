import './NoSearchResults.scss';
import NoSearchResultImg from '../../images/icons/No_search-result2.png';

export const NoSearchResults = () => {
  return (
    <div className="NoSearchResults">
      <h1 className="NoSearchResults__title">No search results...</h1>
      <div className="NoSearchResults__imgContainer">
        <img src={NoSearchResultImg} alt="" className="NoSearchResults__img" />
      </div>

    </div>
  );
};
