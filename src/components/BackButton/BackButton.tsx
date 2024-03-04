import './BackButton.scss';

type Props = {
  navigate: (direction: number) => void;
};

export const BackButton: React.FC<Props> = ({ navigate }) => {
  return (
    <div
      className="back-button-box mb-16"
      onClick={() => navigate(-1)}
      onKeyDown={() => navigate(-1)}
      role="button"
      tabIndex={0}
    >
      <div className="back-button-align mr-4">
        <img src="./img/icons/arrowBackBlack.svg" alt="img" />
      </div>
      <div className="back-button">Back</div>
    </div>
  );
};
