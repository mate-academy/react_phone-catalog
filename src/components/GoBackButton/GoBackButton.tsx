// import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './GoBackButton.scss';

export function GoBackButton() {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const prevLink = pathname.split('/')[1];

  return (
    <button
      aria-label="Go back"
      type="button"
      className="go-back-button"
      onClick={() => navigate({ pathname: '..', search: state?.search })}
      data-cy="backButton"
    >
      <span className="go-back-button__arrow" />
      {`Back ${prevLink !== 'cart' ? `to ${prevLink}` : ''}`}
    </button>
  );
}
