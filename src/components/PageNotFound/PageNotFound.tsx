import './PageNotFound.scss';

export const PageNotFound = () => {
  return (
    <div className="pageError">
      <img
        className="pageErrorImg"
        src="./uploadedImg/error.png"
        alt="404 Error"
      ></img>
    </div>
  );
};
