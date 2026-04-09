import './CardCounter.scss';

type CardCounterProps = {};

const CardCounter = ({}: CardCounterProps) => {
  return (
    <>
      <div className="basket-card__counter">
        <button className="basket-card__counter--decrease">-</button>
        <span className="basket-card__counter--value"></span>
        <button className="basket-card__counter--increase">+</button>
      </div>
    </>
  );
};

export default CardCounter;
