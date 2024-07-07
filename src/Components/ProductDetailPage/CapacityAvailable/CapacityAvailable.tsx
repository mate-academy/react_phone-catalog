import classNames from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDetailedItems } from '../../../api/DetailedProduct';
import { ProductContext } from '../../../store/ProductContext';
import { Product } from '../../../types/Product';
import './CapacityAvailable.scss';

type Props = {
  selectedProduct: Product;
};

export const CapacityAvailable: React.FC<Props> = ({ selectedProduct }) => {
  const { onSelectedProduct, onSelectedImg } = useContext(ProductContext);
  const [capacityGB, setCapacityGB] = useState('');
  const navigate = useNavigate();

  const selectedProductRef = useRef(selectedProduct);
  const onSelectedProductRef = useRef(onSelectedProduct);
  const onSelectedImgRef = useRef(onSelectedImg);
  const navigateRef = useRef(navigate);

  useEffect(() => {
    selectedProductRef.current = selectedProduct;
    onSelectedProductRef.current = onSelectedProduct;
    onSelectedImgRef.current = onSelectedImg;
    navigateRef.current = navigate;
  });

  const handleClickLink = useCallback(
    (capacity: string) => {
      let newId = '';

      selectedProduct.id.split('-').forEach(item => {
        if (
          item.includes('gb') ||
          item.includes('tb') ||
          (item.includes('mm') && capacity !== item)
        ) {
          newId += capacity.toLowerCase() + '-';
        } else {
          newId += item + '-';
        }
      });

      const id = newId.slice(0, -1);

      if (id !== selectedProduct.id) {
        setCapacityGB(id);
      }
    },
    [selectedProduct.id],
  );

  useEffect(() => {
    const getProducts = async () => {
      if (capacityGB && capacityGB !== selectedProductRef.current.id) {
        const products = await getDetailedItems(
          selectedProductRef.current.category,
        );
        const newItem = products.find(item => item.id === capacityGB) || null;

        onSelectedProduct(newItem);

        if (newItem) {
          onSelectedProductRef.current(newItem);
          onSelectedImgRef.current('');
          navigateRef.current(
            `/${selectedProductRef.current.category}/${capacityGB}`,
            {
              replace: true,
            },
          );
        }
      }
    };

    getProducts();
  }, [capacityGB, onSelectedProduct]);

  return (
    <>
      <div className="capacity">
        {selectedProduct.category.includes('accessories') ? (
          <p className="capacity__text">Select size</p>
        ) : (
          <p className="capacity__text">Select capacity</p>
        )}
        <div className="capacity__container">
          {selectedProduct.capacityAvailable.map(capacity => {
            return (
              <React.Fragment key={`capacity${capacity}`}>
                <Link
                  onClick={() => handleClickLink(capacity)}
                  className={classNames('capacity__box', {
                    'capacity__box--active':
                      capacity === selectedProduct.capacity,
                  })}
                  to={`.`}
                  key={capacity}
                >
                  <p className="capacity__box--text">{capacity}</p>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
