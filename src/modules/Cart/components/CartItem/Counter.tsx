import scss from './Counter.module.scss';

interface Props {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const Counter: React.FC<Props> = ({ quantity, onQuantityChange }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <article className={scss.counter}>
      <button
        type="button"
        className={scss.counter__button}
        onClick={handleDecrement}
        disabled={quantity === 1}
      >
        <svg>
          <use href={`${import.meta.env.BASE_URL}icons/icons.svg#minus`}></use>
        </svg>
      </button>
      <span className={scss.counter__display}>{quantity}</span>
      <button
        type="button"
        className={scss.counter__button}
        onClick={handleIncrement}
      >
        <svg>
          <use href={`${import.meta.env.BASE_URL}icons/icons.svg#plus`}></use>
        </svg>
      </button>
    </article>
  );
};
