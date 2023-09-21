import './Error.scss';
import errorImage from '../../img/error-message.png';

export const Error = () => {
  return (
    <div className="error">
      <div className="error__image-container">
        <img
          src={errorImage}
          alt="error"
          className="error__image"
        />
      </div>
      <h2 className="error__message">An error was occured, please try later</h2>
    </div>
  );
};
