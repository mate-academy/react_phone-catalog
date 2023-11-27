import { Details } from '../utils/types/Details';
import { Product } from '../utils/types/Product';

type Props = {
  details: Details | Product,
  items: string[],
};

export const Characteristics:React.FC<Props> = ({ items, details }) => {
  const cell = [typeof details.cell === 'object'
    ? details.cell.join(',') : null];

  return (
    <div className="characteristics">
      <div className="characteristics__list">
        {items.map(item => (
          <div className="characteristics__item" key={item}>
            <div className="characteristics__item--name">{item}</div>
            <div className="characteristics__item--characteristic">
              {item === 'Cell'
                ? cell
                : details[item.toLocaleLowerCase()]}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
