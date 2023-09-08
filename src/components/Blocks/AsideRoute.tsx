import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { HouseIcon, IconSlideRight } from '../../utils/Icons';
import { generateUrlPath } from '../../utils/generateUrlPath';

import { Product } from '../../types/Phone';

import { ProductType } from '../../api/getProducts';

interface Props {
  pageTitle?: string;
  productName?: string;
  product?: Product;
}

const AsideRoute: React.FC<Props> = ({ pageTitle, product, productName }) => {
  const title = useMemo(() => {
    if (product) {
      return product.type !== ProductType.ACCESSORY
        ? `${product.type[0].toUpperCase() + product.type.slice(1)}s`
        : 'Accessories';
    }

    return pageTitle;
  }, [product, pageTitle]);

  const link = useMemo(() => {
    if (pageTitle) {
      return pageTitle.toLowerCase();
    }

    return generateUrlPath(product?.type as ProductType);
  }, [pageTitle]);

  return (
    <aside className="aside-route" data-cy="breadCrumbs">
      <Link to="/"><HouseIcon /></Link>

      <IconSlideRight />

      <Link
        to={`/${link}`}
        className="aside-route__page-title"
      >
        {title}
      </Link>
      {productName
      && (
        <>
          <IconSlideRight />
          <p className="aside-route__product-name">{productName}</p>
        </>
      )}
    </aside>
  );
};

export default AsideRoute;
