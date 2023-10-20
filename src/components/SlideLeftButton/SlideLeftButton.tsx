import './SlideLeftButton.scss';

type Props = {
  onSlideLeft: () => void,
  isDisabled: boolean,
};

export const SlideLeftButton: React.FC<Props> = ({
  onSlideLeft,
  isDisabled,
}) => {
  return (
    <button
      data-cy="paginationLeft"
      type="button"
      className="SlideLeftButton"
      onClick={onSlideLeft}
      disabled={isDisabled}
    >
      <div className="icon icon--left" />
    </button>
  );
};
