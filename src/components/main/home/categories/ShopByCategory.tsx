import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Title } from '../../Title';
import { Category } from './Category';
import { getProducts } from '../../../../helpers/api/GetProducts';
import { ProductType } from '../../../../helpers/enums/ProductType';
import { Product } from '../../../../helpers/types/Product';

export const ShopByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);

  function getDevicesCount(deviceKind: ProductType) {
    return products.filter(product => product.type === deviceKind).length;
  }

  const phonesCount = getDevicesCount(ProductType.phone);
  const tabletsCount = getDevicesCount(ProductType.tablet);
  const accessoriesCount = getDevicesCount(ProductType.accessories);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  return (
    <div className="home__categories shop-by-category">
      <Title>Shop by category</Title>

      <div
        data-cy="categoryLinksContainer"
        className="shop-by-category__categories"
      >
        <Link className="shop-by-category__link" to="phones">
          <Category
            imagePath="img/home/categories/mobile-phones.png"
            name="Mobile phones"
            productsCount={phonesCount}
          />
        </Link>

        <Link className="shop-by-category__link" to="tablets">
          <Category
            imagePath="img/home/categories/tablets.png"
            name="Tablets"
            productsCount={tabletsCount}
          />
        </Link>

        <Link className="shop-by-category__link" to="accessories">
          <Category
            imagePath="img/home/categories/accessories.png"
            name="Accessories"
            productsCount={accessoriesCount}
          />
        </Link>
      </div>
    </div>
  );
};
