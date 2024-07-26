import { notFoundImg } from '../../utils/kit';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <div className="NotFoundPage__container">
        <h2>Page is not found</h2>
        <img
          src={notFoundImg}
          alt="Page is not found"
          className="NotFoundPage__img"
        />
      </div>
    </div>
  );
};
