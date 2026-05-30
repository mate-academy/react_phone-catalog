import notFoundImg from '../../../public/img/page-not-found.png';
import './notFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img
        src={notFoundImg}
        alt="Page not found"
        className="not-found__image"
      />
      <h2 className="not-found__text">Page not found</h2>
    </div>
  );
};
