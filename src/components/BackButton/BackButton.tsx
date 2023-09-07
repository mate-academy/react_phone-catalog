import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  const goBack = () => (
    navigate(-2)
  );

  return (
    <Button
      dataCy="backButton"
      className="back"
      content="Back"
      iconType="arrow-left"
      onClick={() => goBack()}
    />
  );
};
