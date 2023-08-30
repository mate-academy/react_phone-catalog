import { FC } from 'react';
import { Button } from '../Button/Button';

export const BackButton: FC = () => {
  const goBack = () => (
    window.history.back()
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
