import { useLocation, useNavigate } from 'react-router-dom';
import ArrowLeft from '../../images/icons/arrow_left.svg';
import './backbutton.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const backButton = () => {
    if (
      location.pathname.includes('accessories') ||
      location.pathname.includes('tablets') ||
      location.pathname.includes('phones')
    ) {
      return navigate(`/${location.pathname.split('/')[1]}`);
    }

    return navigate(-1);
  };

  return (
    <div className="backButton">
      <img src={ArrowLeft} alt="arrow" />
      <button
        type="button"
        onClick={() => backButton()}
        className="backButton__name"
      >
        Back
      </button>
    </div>
  );
};
