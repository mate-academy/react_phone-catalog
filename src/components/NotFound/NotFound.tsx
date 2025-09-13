import './NotFound.scss';

export const NotFound = () => {
  return (
    <div className="content">
      <div className="content__text">Page not found</div>
      <div className="content__img">
        <img
          src="../../../img/page-not-found.png"
          alt="page not found"
          className="content__img--item"
        />
      </div>
    </div>
  );
};
