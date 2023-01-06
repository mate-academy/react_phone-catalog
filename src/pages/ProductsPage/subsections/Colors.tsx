import classNames from 'classnames';
import { FC } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { Link } from 'react-router-dom';
import { Product } from 'src/types/Product';
import { getColor } from 'src/utils/helpers/getColor';

type Props = {
  selectedProductDetails: ProdcutDetails,
  selectedProductGeneralInfo: Product,
};

export const Colors: FC<Props> = ({
  selectedProductDetails,
  selectedProductGeneralInfo,
}) => {
  const availableColors = selectedProductDetails?.colorsAvailable;

  return (
    <div className="options-wrapper">
      {availableColors.map(el => {
        const colorInHex = getColor(el);
        const currentIdArr = selectedProductDetails.id
          .split('-');

        currentIdArr.pop();
        currentIdArr.push(el);
        const currentLink = currentIdArr.join('-');

        return (
          <Link
            key={el}
            to={`/${selectedProductGeneralInfo.category}/${currentLink}`}
            className={classNames(
              'options-wrapper__color--outer',
              {
                'options-wrapper__color--selected':
                  el === selectedProductDetails.color,
              },
            )}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '2px solid #fff',
                backgroundColor: `${colorInHex}`,
                opacity: '0.8',
              }}
            />
          </Link>
        );
      })}
    </div>
  );
};
