import arrowdown from '../../images/arrowdown.svg';
import './DropDown.scss';

type Props = {
  name: string;
  items: string[] | number[];
};

export const DropDown: React.FC<Props> = ({ name, items }) => {
  return (
    <div className="dropdown">
      <p className="dropdown__name">{name}</p>
      <div className="dropdown__content">
        {items.map((item) => (
          <div className="dropdown__content--inner">
            <div className="dropdown__content--inner-item">{item}</div>
          </div>
        ))}
        <button type="button" className="dropdown__button">
          <img src={arrowdown} alt="down" />
        </button>
      </div>
    </div>
  );
};
