import { useContext, useEffect, useState } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';
// eslint-disable-next-line max-len
import { ProductDetailsCarousel } from '../ProductDetailsCarousel/ProductDetailsCarousel.component';
import { Line } from '../base/Line/Line.component';
import cn from 'classnames';
import { Price } from '../base/Price/Price.component';
import { getProductsSummary } from '../../api/products';
import { ProductSummary } from '../../types/ProductSummary';
import { CardButtons } from '../base/CardButtons/CardButtons.component';
import { SpecsMini } from '../base/SpecsMini/SpecsMini.component';

type Colors = {
  [key: string]: string;
};

const colors: Colors = {
  black: '#4C4C4C',
  spaceblack: '#565C6A',
  green: '#5b7E65',
  yellow: '#EED96C',
  white: '#F0F0F0',
  purple: '#CACDF5',
  red: '#B1081B',
  gold: '#F4E4D1',
  sierrablue: '#AAC6E3',
  graphite: '#96959D',
  silver: '#AAAAAF',
  spacegray: '#B6ADA7',
  'space gray': '#B6ADA7',
  blue: '#6B89B3',
  'sky blue': '#7CACD0',
  'rose gold': '#FDD8D3',
  rosegold: '#FDD8D3',
  starlight: '#E8E0D5',
  pink: '#FD889A',
  midnightgreen: '#626B64',
  midnight: '#31373F',
  coral: '#F19584',
};

export const ProductDetailsMain: React.FC = () => {
  const { selectedProduct } = useContext(StatesContext);
  const [product, setProduct] = useState<ProductSummary>();

  useEffect(() => {
    getProductsSummary().then(prods => {
      if (selectedProduct) {
        const prodSummary = prods.find(p => p.itemId === selectedProduct.id);

        setProduct(prodSummary);
      }
    });
  }, [selectedProduct]);

  if (selectedProduct) {
    return (
      <div className="productDetailsMain">
        <h2>{selectedProduct.name}</h2>
        <ProductDetailsCarousel />
        <div className="productDetailsMain__colors">
          <span className="productDetailsMain__colors-text">
            Available colors
          </span>
          <div className="productDetailsMain__colors-button-container">
            {selectedProduct.colorsAvailable.map((c, i) => (
              <button
                className={cn('productDetailsMain__colors-button-bg', {
                  'productDetailsMain__colors-button-bg--selected':
                    c === selectedProduct.color,
                })}
                key={i + c}
              >
                <div
                  className="productDetailsMain__colors-button"
                  style={{ background: `${colors[c]}` }}
                />
              </button>
            ))}
          </div>
        </div>
        <Line />
        <div className="productDetailsMain__capacity">
          <span className="productDetaisMain__capacity-text">
            Select capacity
          </span>
          <div className="productDetailsMain__capacity-container">
            {selectedProduct.capacityAvailable.map((c, i) => (
              <button
                key={c + i}
                className={cn('productDetailsMain__capacity-button', {
                  'productDetailsMain__capacity-button--selected':
                    c === selectedProduct.capacity,
                })}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <Line />
        {product && (
          <>
            <div className="productDetailsMain__price">
              <Price product={product} />
              <CardButtons product={product} />
            </div>
            <SpecsMini product={product} />
          </>
        )}
      </div>
    );
  }

  return 'no selectedProduct';
};
