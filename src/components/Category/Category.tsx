import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { ProductType } from '../../types/ProductType';
import { getCategoryData } from '../../utils/getCategoryData';
import { countProductByCategory } from '../../utils/countProductByCategory';
import { formatTotal } from '../../utils/formatTotal';

import './Category.scss';

const IMG_SIZE = 368;

type Props = {
  productType: ProductType,
};

export const Category: React.FC<Props> = ({ productType }) => {
  const { products } = useAppSelector(state => state.products);

  const { linkPath, imgPath, title } = getCategoryData(productType);

  const countProduct = useMemo(() => {
    return countProductByCategory(products, productType);
  }, [products, productType]);

  const totalProduct = formatTotal(countProduct, 'model');

  return (
    <article className="ShopByCategory-Category Category">
      <Link
        to={linkPath}
        className="Category-Link"
      >
        <div className={cn(
          'Category-Container',
          {
            'Category-Container_mobile': productType === ProductType.PHONE,
            'Category-Container_tablet': productType === ProductType.TABLET,
            // eslint-disable-next-line max-len
            'Category-Container_accessory': productType === ProductType.ACCESSORY,
          },
        )}
        >
          <img
            className="Category-Img"
            src={imgPath}
            alt={title}
            width={IMG_SIZE}
            height={IMG_SIZE}
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3 className="Category-Title">{title}</h3>
      </Link>

      <div className="Category-Total Total">{totalProduct}</div>
    </article>
  );
};
