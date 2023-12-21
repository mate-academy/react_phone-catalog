import classNames from 'classnames';
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
      aria-label="Pagination previus"
      data-cy="paginationLeft"
      type="button"
      className={classNames('SlideLeftButton', {
        disabled: isDisabled,
      })}
      onClick={onSlideLeft}
    >
      <div className="icon icon--left" />
    </button>
  );
};
