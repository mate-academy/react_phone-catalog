import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../helpers/Product';

type Props = {
  product: Product;
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
  calculateTotal: () => void;
};

export const AddCart: React.FC<Props> = ({
  product,
  onAddtoChart,
  calculateTotal,
}) => {
  const {
    price,
    image,
    name,
    id,
    category,
    phoneId,
  } = product;

  const [stateQuantity, setStateQuantity] = useState(1);

  useEffect(() => {
    const savedQuantity = localStorage.getItem(`quantity_${product.phoneId}`);

    if (savedQuantity) {
      setStateQuantity(parseInt(savedQuantity, 10));
    }
  }, []);

  const handleDelete = () => {
    onAddtoChart(product);

    localStorage.setItem(`quantity_${product.phoneId}`, '1');
  };

  const handlePlus = () => {
    if (stateQuantity) {
      setStateQuantity(stateQuantity + 1);
      localStorage.setItem(`quantity_${product.phoneId}`, (stateQuantity + 1).toString());
      calculateTotal();
    }
  };

  const handleMinus = () => {
    if (stateQuantity) {
      setStateQuantity(stateQuantity - 1);
      localStorage.setItem(`quantity_${product.phoneId}`, (stateQuantity - 1).toString());
      calculateTotal();
    }

    if (stateQuantity === 1) {
      onAddtoChart(product);
    }
  };

  return (
    <div className="addPage__minicontainer" key={id}>
      {/* eslint-disable-next-line */}

      <div className="addPage__imgAndName">
        <button
          className="addPage__cross addPage__buttonImg"
          onClick={handleDelete}
          type="button"
        />

        <img
          src={` https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt="phone"
          className="addPage__img"
        />
        <Link
          className="addPage__name"
          to={`/${category}/${phoneId}`}
        >
          {name}
        </Link>
      </div>

      <div className="addPage__button--container">
        <button
          className="addPage__button"
          onClick={handleMinus}
          type="button"
        >
          <p className="addPage__minus addPage__buttonImg" />
        </button>

        <div className="addPage__phoneCounter">{`${stateQuantity}`}</div>

        <button
          className="addPage__button"
          onClick={handlePlus}
          type="button"
        >
          <p className="addPage__plus addPage__buttonImg" />
        </button>
      </div>
      <div className="addPage__phoneProce">
        {`$${price}`}
      </div>
    </div>
  );
};
