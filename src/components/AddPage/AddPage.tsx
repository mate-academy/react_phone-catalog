import { useEffect, useState } from 'react';

import { Product } from '../../helpers/Product';

import { BackButton } from '../BackButton/BackButton';
import './AddPage.scss';
import { AddCart } from './AddCart';

type Props = {
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
};

export const AddPage: React.FC<Props> = ({
  addProduct,
  onAddtoChart,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCounter, setTotalCounter] = useState(addProduct.length);
  const [checkout, setCheckout] = useState(true);

  const calculateTotal = () => {
    let total = 0;
    let counter = 0;

    addProduct.forEach((product) => {
      const savedQuantity = localStorage.getItem(`quantity_${product.phoneId}`);

      if (savedQuantity) {
        total += product.price * parseInt(savedQuantity, 10);
        counter += +savedQuantity;
      }
    });

    setTotalPrice(total);
    setTotalCounter(counter);
  };

  useEffect(() => {
    calculateTotal();
  }, [addProduct]);

  const handleAddToChart = (product: Product) => {
    onAddtoChart(product);
  };

  const handleCheckout = () => {
    setCheckout(!checkout);
  };

  return (
    <div className="addPage">
      <BackButton />
      {checkout ? (
        <>
          <h1 className="addPage__header">Cart</h1>
          <div className="addPage__body">
            {addProduct.length !== 0 ? (
              <>
                <div className="addPage__container">
                  {addProduct.map(like => (
                    <AddCart
                      product={like}
                      addProduct={addProduct}
                      onAddtoChart={handleAddToChart}
                      key={like.id}
                      calculateTotal={calculateTotal}
                    />
                  ))}
                </div>

                <div className="addPage__totalContainer">
                  <div className="addPage__totalContainer--mimi">
                    <div className="addPage__totalPrice">
                      {`$${totalPrice}`}
                    </div>

                    <p className="addPage__subtitle">
                      {`Total for ${totalCounter} items`}
                    </p>
                  </div>
                  <button
                    className="addPage__checkout"
                    onClick={handleCheckout}
                    type="button"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )
              : (
                <div className="addPage__not">
                  You haven&apos;t added any products yet!
                </div>
              )}
          </div>
        </>
      ) : (
        <div className="addPage__not">
          We are sorry, but this action hasn&apos;t been implemented yet
        </div>
      )}
    </div>
  );
};
