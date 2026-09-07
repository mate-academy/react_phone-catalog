import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="flex mt-10 items-center">
      <button onClick={handleBackButton} className="flex  items-center gap-1">
        <img src="/img/icons/Vector (Stroke) left.svg" alt="back" />
        <span className="text-xs text-center text-gray-400">Back</span>
      </button>
    </div>
  );
};

export default BackButton;
