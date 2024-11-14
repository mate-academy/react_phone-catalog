import classNames from 'classnames';
import style from './CapacitySelector.module.scss';

type Props = {
  capacities: string[];
  selectedCapacity: string;
  onClick: (capacity: string) => void;
};
export const CapacitySelector: React.FC<Props> = ({
  capacities,
  selectedCapacity,
  onClick,
}) => {
  return (
    <div className={style.capacity_selector_container}>
      {capacities.map(capacity => {
        return (
          <div
            key={capacity}
            className={classNames('buttons_container', {
              buttons_container_selected: selectedCapacity !== capacity,
            })}
            onClick={() => {
              onClick(capacity);
            }}
          >
            <div
              className={classNames('buttons_text', {
                buttons_text_selected: selectedCapacity !== capacity,
              })}
            >
              {capacity}
            </div>
          </div>
        );
      })}
    </div>
  );
};
