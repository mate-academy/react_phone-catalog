import './NotFound.scss';
import ErrorImg from '../../images/404 error interface art word.png';

export const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="notFound__title">Page is not found...</h1>
      <img src={ErrorImg} alt="" className="notFound__img" />
    </div>

  );
};
