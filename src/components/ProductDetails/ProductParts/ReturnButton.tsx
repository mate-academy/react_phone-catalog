import { useNavigate } from 'react-router-dom';

export const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      style={{ border: 'none' }}
      className="button p-0"
      onClick={() => {
        navigate(-1);
      }}
    >
      <span className="icon">
        <i className="fa-solid fa-angle-left" />
      </span>
      <span
        className="has-text-grey-light "
      >
        Back
      </span>
    </button>
  );
};
