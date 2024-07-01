import { Colors } from '../../../utils/Colors';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import './AvailiableColors.scss';
import classNames from 'classnames';
import { ProductContext } from '../../../store/ProductContext';
import { getDetailedItems } from '../../../api/DetailedProduct';

type Props = {
  selectedProduct: Product;
  property?: string;
};

export const AvailableColors: React.FC<Props> = ({ selectedProduct }) => {
  const [newId, setNewId] = useState('');
  const navigate = useNavigate();
  const { onSelectedProduct, onSelectedImg } = useContext(ProductContext);

  const onSelectedProductRef = useRef(onSelectedProduct);
  const selectedProductRef = useRef(selectedProduct);
  const onSelectedImgRef = useRef(onSelectedImg);
  const navigateRef = useRef(navigate);

  useEffect(() => {
    selectedProductRef.current = selectedProduct;
    onSelectedProductRef.current = onSelectedProduct;
    onSelectedImgRef.current = onSelectedImg;
    navigateRef.current = navigate;
  });

  const handleColorClick = useCallback(
    (color: string) => {
      const newColor = color.split(' ').join('-');
      let result;

      if (selectedProduct.color.split(' ').length > 1) {
        result = selectedProduct.id.split('-').slice(0, -2);
      } else {
        result = selectedProduct.id.split('-').slice(0, -1);
      }

      const id = result.join('-') + `-${newColor}`;

      if (id !== selectedProduct.id) {
        setNewId(id);
      }
    },
    [selectedProduct.id, selectedProduct.color],
  );

  useEffect(() => {
    const getProducts = async () => {
      if (newId && newId !== selectedProductRef.current.id) {
        const products = await getDetailedItems(
          selectedProductRef.current.category,
        );
        const newItem = products.find(item => item.id === newId);

        if (newItem) {
          onSelectedProductRef.current(newItem);
          onSelectedImgRef.current('');
          navigateRef.current(
            `/${selectedProductRef.current.category}/${newId}`,
            { replace: true },
          );
        }
      }
    };

    getProducts();
  }, [newId]);

  return (
    <div className="available">
      {selectedProduct.colorsAvailable.map(element => {
        const backGroundColor = Colors[element];

        return (
          <React.Fragment key={`color${element}`}>
            <div
              className={classNames('available__color', {
                'available__color--active': element === selectedProduct.color,
              })}
            >
              <NavLink
                to={'.'}
                onClick={() => {
                  handleColorClick(element);
                }}
              >
                <div
                  className={'available__color--item'}
                  style={{ backgroundColor: `${backGroundColor}` }}
                ></div>
              </NavLink>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
