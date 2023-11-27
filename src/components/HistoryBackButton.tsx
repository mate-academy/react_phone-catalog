import { useNavigate } from 'react-router-dom';

export const HistoryBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-button">
      <div className="icon icon--back" />
      <p
        role="presentation"
        className="text__small"
        onClick={() => handleGoBack()}
      >
        Back
      </p>
    </div>
  );
};
