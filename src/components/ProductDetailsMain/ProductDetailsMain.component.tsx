import { useContext, useEffect, useState } from 'react';
import { StatesContext } from '../../store/GlobalStateProvider';
// eslint-disable-next-line max-len
import { Line } from '../base/Line/Line.component';
import cn from 'classnames';
import { Price } from '../base/Price/Price.component';
import { getProductsSummary } from '../../api/products';
import { ProductSummary } from '../../types/ProductSummary';
import { CardButtons } from '../base/CardButtons/CardButtons.component';
import { SpecsMini } from '../base/SpecsMini/SpecsMini.component';
import { colors } from '../../utils/colors';

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
          <span className="productDetailsMain__capacity-text">
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
