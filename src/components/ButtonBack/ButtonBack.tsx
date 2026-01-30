import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <div className="back" onClick={() => navigate(-1)}>
      <span>&#60;</span>
      <span>Back</span>
    </div>
  );
};
