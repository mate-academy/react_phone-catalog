import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';
import { Phone } from '../../types/phone';
import { Products } from '../../types/products';

type Props = {
  products: Phone[] | Tablet[] | Accessory[];
  type: 'phones' | 'tablets' | 'accessories';
};

export const List: React.FC<Props> = ({ type }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const [products, setProducts] = useState<Products[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then((data: Products[]) => {
        const filteredProducts = data.filter(el => el.category === type);
        setProducts(filteredProducts);
        setSortedProducts(filteredProducts);
      });
  }, [type]);

  useEffect(() => {
    let sortedData = [...products];

    const sortParam = searchParams.get('sort') || 'Default';
    switch (sortParam) {
      case 'Alphabetically':
        sortedData = sortedData.sort((one, two) => one.name.localeCompare(two.name));
        break;

      case 'Cheapest':
        sortedData = sortedData.sort((one, two) => one.price - two.price);
        break;

      case 'Default':
        sortedData = sortedData.sort((one, two) => two.year - one.year);
        break;
    }

    const itemsOnPage = searchParams.get('perPage') || 'Default';
    switch (itemsOnPage) {
      case '4':
        sortedData = sortedData.slice(0, 4);
        break;

      case '8':
        sortedData = sortedData.slice(0, 8);
        break;

      case '16':
        sortedData = sortedData.slice(0, 16);
        break;

      case 'Default':
        sortedData = [...sortedData];
        break;
    }

    setSortedProducts(sortedData);
  }, [products, searchParams]);

  return (
    <ul className='card__grid'>
      {sortedProducts.length > 0 &&
        sortedProducts.map(product => (
          <div key={product.id} className="card">
            <Link to={`/${type}/${product.itemId}`}>
              <img
                className="card__image"
                src={product.image}
                alt="card-image"
              />
            </Link>
            <p className="card__name">{product.name}</p>
            <p className="card__price-regular">{`${product.price}$`}</p>

            <div className="card__line"></div>

            <div className="card__screen">
              <p className="card__screen-name">Screen</p>
              <p className="card__screen-info">{product.screen}</p>
            </div>

            <div className="card__capacity">
              <p className="card__capacity-name">Capacity</p>
              <p className="card__capacity-info">{product.capacity}</p>
            </div>

            <div className="card__ram">
              <p className="card__ram-name">Ram</p>
              <p className="card__ram-info">{product.ram}</p>
            </div>

            <div className="card__buy">
              <button className="card__buy-cart">Add to cart</button>
              <img src="./img/add-to-cart.svg" alt="add-to-cart" />
            </div>
          </div>
        ))}
    </ul>
  );
};
