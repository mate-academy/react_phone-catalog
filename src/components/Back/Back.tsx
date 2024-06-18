import { useLocation, useNavigate } from 'react-router-dom';
import './Back.scss';

export const Back = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPage: string | null = location.state?.pathname ?? null;

  const handleClick = () => {
    if (prevPage !== null) {
      navigate(location.state.pathname);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back" onClick={handleClick}>
      Back
    </button>
  );
};
