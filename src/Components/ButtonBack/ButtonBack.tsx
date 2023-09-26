// import { Link } from 'react-router-dom';

import './buttonBack.scss';

export const ButtonBack = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <button
        type="button"
        className="back"
        data-cy="backButton"
        onClick={handleGoBack}
      >
        back
      </button>
      {/* <Link
        to={() => goBack}
        className="back"
      >
        <div className="back--icon icon" />

        <p className="back--title">Back</p>
      </Link> */}
    </>
  );
};
