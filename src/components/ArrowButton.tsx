type Props = {
  type: string,
  stop?: boolean,
  onChangePosition?: () => void,
};

export const ArrowButton: React.FC<Props> = ({
  type,
  onChangePosition,
  stop,
}) => {
  return (
    <button
      type="submit"
      className={`arrow__button arrow__button--${type}`}
      onClick={onChangePosition}
      disabled={stop}
    >
      <img src={`assests/images/Arrow-right${stop ? '-gray' : ''}.svg`} alt="arrow button" />
    </button>
  );
};
