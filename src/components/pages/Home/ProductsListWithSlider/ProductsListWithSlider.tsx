import './ProductsListWithSlider.scss';

import { useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import { ProductCard } from '../../../../common/ProductCard/ProductCard';
import { ProductContext } from '../../../../context/ProductContext';

export const ProductsListWithSlider: React.FC<any> = (
  { products, title },
) => {
  const { pathname } = useLocation();
  const [width, setWidth] = useState(0);
  const [initialWidth, setInitialWidth] = useState<any>(0);
  // const [isDisabled, setIsDisabled] = useState(true);
  const ref = useRef<any>(null);
  const { setProduct } = useContext<any>(ProductContext);

  const maxMargin = initialWidth * (products.length - 5);
  const moveRight = (event: any) => {
    if (ref.current && ref) {
      setInitialWidth(ref.current.offsetWidth);
      event.preventDefault();
      if (width <= maxMargin) {
        setWidth(width + ref.current.offsetWidth);
      }
    }
  };

  const moveLeft = (event: any) => {
    event.preventDefault();
    if (!ref.current || !ref) {
      return;
    }

    if (width > 0) {
      setWidth(width - ref.current.offsetWidth);
    }
    // console.log(width)
    // if (width <= 0) {
    //   setIsDisabled(true);
    // }
    // if(visibleBanner <= 0){
    //   return;
    // }
  };

  return (
    <div className="products-list-with-slider__block">
      <div className="products-list-with-slider__header">
        <h1 className="block__title">{title}</h1>
        <div className="slider-buttons">
          <Button
            className="arrow left small"
            onClick={moveLeft}
            image="/icons/Chevron (Arrow Left).svg"
            alt="<"
            // disabled={isDisabled}
          />
          <Button
            className="arrow right small"
            onClick={moveRight}
            image="/icons/Chevron (Arrow Right).svg"
            alt=">"
          />
        </div>
      </div>
      <ul
        className="product-list"
        style={{ marginLeft: `${-width}px` }}
      >
        {products.map((p: any) => {
          return (
            <li
              key={p.id}
              ref={ref}
              className="product-list__slider-item"
              aria-hidden
              onClick={async () => {
                const newProduct = products.find((one: any) => one.id === p.id);

                const response = await fetch(
                  `/_new/products/${newProduct.itemId}.json`,
                  {
                    method: 'GET',
                  },
                );

                if (response.status === 200) {
                  const result = await response.json();

                  window.history.replaceState(null, '', `/phones/${newProduct.id}`);

                  return setProduct(result);
                }
              }}
            >

              <ProductCard
                product={p}
                link={pathname !== '/home'
                  ? `../${p.id}`
                  : `../${p.category}/${p.id}`}
              />
            </li>

          );
        })}
      </ul>

    </div>
  );
};
