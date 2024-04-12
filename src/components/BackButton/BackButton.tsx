import { useNavigate } from 'react-router-dom';
import ArrowLeft from '../../images/icons/arrow_left.svg';
import './backbutton.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  // const { search } = useLocation();

  // const goBack = () => {
  //   navigate({ pathname: '..', search });
  // };

  return (
    <div className="backButton">
      <img src={ArrowLeft} alt="arrow" />
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="backButton__name"
      >
        Back
      </button>
    </div>
  );
};
