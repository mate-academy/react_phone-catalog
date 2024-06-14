import { Link } from 'react-router-dom';
import { Product } from '../../../../../../types/Product';
import { productItem } from '../../../../../../utils/utils';
import classNames from 'classnames';
import { productColors } from '../../../../../../constants/productColors';
import './Colors.scss';

type Props = {
  product: Product;
  className: string;
};

export const Colors: React.FC<Props> = ({ product, className }) => {
  const { namespaceId, capacity, colorsAvailable, color } = product;
  const productColor = productItem.getColor(color);

  return (
    <>
      <div className="colors__text">
        <p className="text--grey">Available colors</p>
      </div>
      <div className={`${className} colors`}>
        {colorsAvailable.map(currentColor => {
          const backgroundColor = productColors[currentColor];

          const link = `../${productItem.getLink(namespaceId, capacity, currentColor)}`;

          return (
            <Link
              key={currentColor}
              to={link}
              className={classNames('colors__link border', {
                'colors__link--active': productColor === currentColor,
              })}
              style={
                {
                  '--bg-color': `${backgroundColor}`,
                } as React.CSSProperties
              }
            >
              <div
                className="colors__item"
                style={{
                  backgroundColor: `${backgroundColor}`,
                }}
              ></div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
