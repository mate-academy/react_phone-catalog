import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../types/Icons';
import { Icon } from '../Icon';
import './BackButton.scss';

export const BackButton = memo(() => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <button
      type="button"
      className="back-button"
      onClick={goBack}
    >
      <Icon icon={Icons.ArrowLeft} />
      <p className="back-button__text">
        Back
      </p>
    </button>
  );
});
