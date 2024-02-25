/* eslint-disable */
import './ProductCard.scss';
import classNames from 'classnames';

type Props = {
  selectedColor: string,
  id: string,
  color: string,
  onClick: (id: string) => void
};

export const ColorCircleElement: React.FC<Props> = ({
  selectedColor, id, color, onClick,
}) => {
  return (
    <div
      id={id}
      className={classNames('color-cirlce mr-8', {
        selected: selectedColor === id,
      })}
      onClick={(event) => onClick(event.currentTarget.id)}
    >
      <div className="color-cirlce-small" style={{ backgroundColor: color }} />
    </div>
  );
};
