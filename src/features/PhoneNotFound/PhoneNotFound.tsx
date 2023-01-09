import './PhoneNotFound.scss';

export const PhoneNotFound = () => {
  return (
    <div className="phone-not-found-wrapper">
      <div className="phone-not-found">
        <div className="phone-not-found__error">
          Device is not found...
        </div>

        <div className="phone-not-found__message">
          please try again later
        </div>
      </div>
    </div>
  );
};
