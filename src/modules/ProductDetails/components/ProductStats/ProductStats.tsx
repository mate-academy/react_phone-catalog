import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ProductUniversal } from '../../../shared/components/types/ProductUniversal';
import './ProductStats.scss';
import { StateContext } from '../../../utils/GlobalStateProvider';
import classNames from 'classnames';

type Props = {
  product: ProductUniversal;
  isFullList?: boolean;
};

export const ProductStats: React.FC<Props> = ({
  product,
  isFullList = false,
}) => {
  const { isDarkThemeOn } = useContext(StateContext);

  return (
    <div
      className={classNames('product-stats', {
        'product-stats-dark': !isDarkThemeOn,
      })}
    >
      <div className="product-stats__screen">
        <small>Screen</small>
        <p>{product.screen}</p>
      </div>
      <div className="product-stats__cpu">
        <small>Proccessor</small>
        <p>{product.processor}</p>
      </div>
      <div className="product-stats__ram">
        <small>RAM</small>
        <p>{product.ram}</p>
      </div>

      {product.camera && (
        <div className="product-stats__camera">
          <small>Camera</small>
          <p>{product.camera}</p>
        </div>
      )}

      {isFullList && (
        <>
          {product.resolution && (
            <div className="product-stats__resolution">
              <small>Resolution</small>
              <p>{product.resolution}</p>
            </div>
          )}

          {product.zoom && (
            <div className="product-stats__zoom">
              <small>Zoom</small>
              <p>{product.zoom}</p>
            </div>
          )}

          {product.cell && (
            <div className="product-stats__cell">
              <small>Cell</small>
              <p>{product.cell.join(', ')}</p>
            </div>
          )}

          <div className="product-stats__memory">
            <small>Built in memory</small>
            <p>{product.capacity}</p>
          </div>
        </>
      )}
    </div>
  );
};
