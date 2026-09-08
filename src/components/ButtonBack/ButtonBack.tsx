import { Link, useNavigate } from 'react-router-dom';
import './ButtonBack.scss';
import { useCallback } from 'react';

export const ButtonBack = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Link
      to={'#'}
      className="back__line"
      onClick={handleBack}
    >
      <span className="back__arrow" />
      <div className="back__link">
        <span>Back</span>
      </div>
    </Link>
  );
}
