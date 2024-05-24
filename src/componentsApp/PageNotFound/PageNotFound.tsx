/* eslint-disable max-len */
import './PageNotFound.scss';
// import empty from '../../../public/img/page-not-found.png';
// "https://olehmarushchak.github.io/react_phone-catalog/static/media/public/img/page-not-found.png"

export const PageNotFound: React.FC = () => {
  return (
    <div className="PageNotFound">
      <div className="PageNotFound__center">
        <img
          src="https://raw.githubusercontent.com/olehmarushchak/react_phone-catalog/develop/src/assets/img/page-not-found.png"
          alt="page not found"
        />
      </div>
    </div>
  );
};
