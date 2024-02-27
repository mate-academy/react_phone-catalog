import { useNavigate } from 'react-router-dom';
import { RightBtn } from '../../assets/icons/RightBtn';
import './GoBack.scss';

type Props = {
  isDetails?: boolean,
};

export const GoBack = ({ isDetails }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (isDetails) {
      navigate('/phones');
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className="go-back"
      onClick={() => handleBack()}
      data-cy="backButton"
    >
      <RightBtn className="go-back__arrow" />
      Back
    </button>
  );
};
