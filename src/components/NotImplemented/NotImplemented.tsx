type Props = {
  callback: () => void;
};

export const NotImplemented: React.FC<Props> = ({ callback }) => {
  return (
    <div className="not-implemented">
      <div className="not-implemented__container">
        <p className="not-implemented__message">
          We are sorry, but this feature is not implemented yet
        </p>
        <button
          type="button"
          className="not-implemented__button icon-button"
          onClick={callback}
        >
          OK
        </button>
      </div>
    </div>
  );
};
