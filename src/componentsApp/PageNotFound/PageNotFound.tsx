/* eslint-disable max-len */
import './PageNotFound.scss';

export const PageNotFound: React.FC = () => {
  return (
    <div className="PageNotFound">
      <div className="PageNotFound__center">
        <img
          className="PageNotFound__img"
          src="https://raw.githubusercontent.com/olehmarushchak/react_phone-catalog/develop/src/assets/img/page-not-found.png"
          alt="page not found"
        />
      </div>
    </div>
  );
};
