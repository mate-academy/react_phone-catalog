import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'src/types/Product';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { lower } from 'src/utils/shortHands';
import './Capacity.scss';

type Props = {
  selectedCapacity: string,
  setSelectedCapacity: React.Dispatch<React.SetStateAction<string>>,
  selectedProductGeneralInfo: Product,
  selectedProductDetails: ProdcutDetails,
};

export const Capacity: FC<Props> = ({
  selectedCapacity,
  setSelectedCapacity,
  selectedProductGeneralInfo,
  selectedProductDetails,
}) => {
  const { capacityAvailable } = selectedProductDetails;

  return (
    <div className="options-wrapper">
      {capacityAvailable.map(el => {
        const currentIdArr = selectedProductDetails.id
          .split('-');

        const color = currentIdArr.pop();

        currentIdArr.pop();
        currentIdArr.push(lower(el));

        if (color) {
          currentIdArr.push(color);
        }

        const currentLink = currentIdArr.join('-');

        return (
          <Link
            key={el}
            to={`/${selectedProductGeneralInfo?.category}/${currentLink}`}
            onClick={() => setSelectedCapacity(el)}
            className={classNames(
              'options-wrapper__capacity',
              {
                'options-wrapper__capacity--selected':
          el === selectedCapacity,
              },
            )}
          >
            {el}
          </Link>
        );
      })}
    </div>
  );
};
