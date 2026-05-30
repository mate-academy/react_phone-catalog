import { Link } from 'react-router-dom';
import { Product } from '../../../../../../types/Product';
import classNames from 'classnames';
import { productColors } from '../../../../../../constants/productColors';
import './Colors.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../../../../store/ProductContext';
import { productItem } from '../../../../../../utils/productItem';

type Props = {
  product: Product;
  className: string;
};

export const Colors: React.FC<Props> = ({ product, className }) => {
  const { namespaceId, capacity, colorsAvailable, color } = product;
  const { darkTheme } = useContext(ProductContext);
  const productColor = productItem.getColor(color);

  return (
    <>
      <div className="colors__text">
        <p className="text--grey">Available colors</p>
      </div>
      <div className={`${className} colors`}>
        {colorsAvailable.map(currentColor => {
          const normalizedColor = productItem.getColor(currentColor);
          const backgroundColor = productColors[normalizedColor];

          const link = `../${productItem.getLink(namespaceId, capacity, currentColor)}`;

          return (
            <Link
              key={currentColor}
              to={link}
              className={classNames('colors__link', {
                'colors__link--active': productColor === currentColor,
                colors__link__darkTheme: darkTheme,
              })}
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
