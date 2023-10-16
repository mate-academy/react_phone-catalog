import classNames from 'classnames';

type SmallPhotoProps = {
  imageSource: string
  isSelected: boolean
  index: number
  onClick: (index: number) => void
};

export const SmallPhoto = ({
  imageSource,
  isSelected,
  index,
  onClick,
}: SmallPhotoProps) => {
  const buttonClasses = classNames('small-photo', {
    'small-photo--selected': isSelected,
  });

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={() => onClick(index)}
    >
      <img
        className="small-photo__picture"
        src={imageSource}
        alt="Small product"
      />
    </button>
  );
};
