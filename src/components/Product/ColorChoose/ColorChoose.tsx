import { Link } from 'react-router-dom';

import classNames from 'classnames';
import './ColorChoose.scss';

import { ProductDetails } from '../../../types/ProductDetails';
import { getCurrentLink } from '../../../helpers/getCurrentLink';
import { getColor } from '../../../helpers/getColor';

type Props = {
  colors: string[],
  currentColor: string,
  productDetails: ProductDetails | null,
};

export const ColorChoose: React.FC<Props> = ({
  colors,
  currentColor,
  productDetails,
}) => (
  <div className="color-choose">
    <p className="color-choose--title">
      Availeble colors
    </p>

    <ul className="color-choose__list">
      {colors.map(c => {
        const isActive = currentColor === c;

        return (
          <Link
            key={c}
            to={`../${getCurrentLink(productDetails, c)}`}
            className={classNames('color-choose--link', {
              'color-choose--link-active': isActive,
            })}
          >
            <div
              className="color-choose--link-rug"
              style={{
                backgroundColor: getColor(c),
              }}
            />
          </Link>
        );
      })}
    </ul>
  </div>
);
