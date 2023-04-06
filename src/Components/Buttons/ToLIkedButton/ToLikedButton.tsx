import './ToLikedButton.scss';

export const ToLikedButton = () => {
  return (
    <>
      <button type="button" className="liked liked--add">
        <img
          src="/Images/Heart--001.svg"
          alt="Hearе"
          style={{ width: '15px', height: '15px' }}
        />
      </button>
    </>
  );
};
