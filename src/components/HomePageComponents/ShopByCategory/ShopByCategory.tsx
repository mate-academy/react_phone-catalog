import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../../api';
import { Product } from '../../../types/ProductsType';

export const ShopByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phonesLength, setPhonesLength] = useState(0);
  const [tabletsLength, setTabletsLength] = useState(0);
  const [accessoriesLength, setAccessoriesLength] = useState(0);

  useEffect(() => {
    getProducts().then(loadedProducts => setProducts(loadedProducts));
  }, []);

  useEffect(() => {
    const phonesCount = products.filter(
      product => product.category === 'phones',
    ).length;
    const tabletsCount = products.filter(
      product => product.category === 'tablets',
    ).length;
    const accessoriesCount = products.filter(
      product => product.category === 'accessories',
    ).length;

    setPhonesLength(phonesCount);
    setTabletsLength(tabletsCount);
    setAccessoriesLength(accessoriesCount);
  }, [products]);

  const categories = [
    {
      id: 'phones',
      title: 'Mobile phones',
      quantity: phonesLength,
      image: 'img/category-phones-3x.png',
    },
    {
      id: 'tablets',
      title: 'Tablets',
      quantity: tabletsLength,
      image: 'img/category-tablets-3x.png',
    },
    {
      id: 'accessories',
      title: 'Accessories',
      quantity: accessoriesLength,
      image: 'img/category-accessories-3x.png',
    },
  ];

  return (
    <div className="shop-by-category">
      <div className="shop-by-category__container">
        <h1 className="shop-by-category__title">Shop by category</h1>
        <div className="shop-by-category__content">
          {categories.map(({ id, title, quantity, image }) => (
            <Link
              key={id}
              to={`${id}`}
              className="shop-by-category__gadget__link"
            >
              <div className="shop-by-category__gadget__block">
                <div className="shop-by-category__gadget__img-block">
                  <img
                    src={image}
                    alt={image}
                    className="shop-by-category__gadget__img"
                  />
                </div>
                <div className="shop-by-category__gadget__info">
                  <div className="shop-by-category__gadget__title">{title}</div>
                  <div className="shop-by-category__gadget__quantity-models">
                    {quantity} models
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
