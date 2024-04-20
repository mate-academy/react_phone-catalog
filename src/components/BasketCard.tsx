import { SliderButton } from './SliderButton';
import plusIcon from '../images/icons/plus.svg';
import plusActiveIcon from '../images/icons/plus-active.svg';
import minusIcon from '../images/icons/minus.svg';
import minusActiveIcon from '../images/icons/minus-active.svg';
import deleteIcon from '../images/icons/close-disable.svg';
import { BasketGoods, Product } from '../types/product';
import { useLocalStorage } from 'usehooks-ts';
import { handleToggleBasket } from '../helpers/functions';

interface Props {
  quantity: number;
  product: Product;
  onChange: (id: Product['itemId'], quantity: number) => void;
}

export const BasketCard: React.FC<Props> = ({
  quantity,
  product,
  onChange,
}) => {
  const [basket, setBasket] = useLocalStorage<BasketGoods[]>('basketGoods', []);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value.replace(/[^\d]/g, '');

    onChange(product.itemId, value >= 100 ? 100 : value);
  };

  return (
    <article
      className="
        flex flex-col justify-between gap-4 border
        border-elements p-4 md:flex-row md:gap-6 md:p-6
      "
    >
      <div className="flex items-center gap-4">
        <img
          src={deleteIcon}
          alt="Delete"
          className="cursor-pointer"
          onClick={() => handleToggleBasket(product.itemId, basket, setBasket)}
        />

        <img
          src={product.image}
          alt="Product"
          className="aspect-square h-20 object-contain p-1"
        />

        <p className="flex-1">{product.name}</p>
      </div>

      <div className="flex items-center justify-between gap-6 md:max-w-[200px]">
        <div className="flex">
          <SliderButton
            onClick={() => onChange(product.itemId, quantity - 1)}
            disabled={quantity === 1}
          >
            <img
              src={quantity === 1 ? minusIcon : minusActiveIcon}
              alt="Minus"
            />
          </SliderButton>

          <input
            maxLength={3}
            value={quantity}
            onChange={e => handleChangeField(e)}
            type="text"
            className="h-8 max-w-8 text-center outline-none"
          />

          <SliderButton
            onClick={() => onChange(product.itemId, quantity + 1)}
            disabled={quantity === 100}
          >
            <img
              src={quantity === 100 ? plusIcon : plusActiveIcon}
              alt="Plus"
            />
          </SliderButton>
        </div>

        <h3 className="font-bold">${product.price}</h3>
      </div>
    </article>
  );
};
