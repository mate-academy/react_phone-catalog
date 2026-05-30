import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetails.scss';
import { ProductDetailsNav } from './ProductDetailsNav';
import { useContext, useEffect, useState } from 'react';
import { getGoods } from '../../api';
import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import { Accessories } from '../../types/Accessories';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { ProductDetailsList } from './ProductDetailsList';
import { parseProductId } from '../../utils/url';
import { ProductDetailsSlider } from './ProductDetailsSlider';
import { ProductsContext } from '../../context/ProductContext';

export const ProductDetails = () => {
  const location = useLocation().pathname.replace('/', '');
  const navigate = useNavigate();
  const [category, productId = ''] = location.split('/');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [goods, setGoods] = useState<Tablets[] | Phones[] | Accessories[]>([]);
  const [modelName, setModelName] = useState('');
  const [modelColor, setModelColor] = useState('');
  const [modelCapacity, setModelCapacity] = useState('');
  const [modal, setModal] = useState('');
  const [mainPicture, setMainPicture] = useState<string | undefined>(undefined);
  const { products } = useContext(ProductsContext);

  const id = products.find(product => {
    return productId.toLowerCase() === product.itemId.toLowerCase();
  });

  useEffect(() => {
    const { name, capacity, color } = parseProductId(productId);

    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

    const normalizedName = normalize(name);
    const normalizedCapacity = normalize(capacity);
    const normalizedColor = normalize(color);
    const normalizedId = `${normalizedName}-${normalizedCapacity}-${normalizedColor}`;

    const currentId = productId.toLowerCase().replace(/\s+/g, '-');

    if (normalizedId !== currentId) {
      navigate(`/${category}/${normalizedId}`, { replace: true });
    } else {
      setModelName(normalizedName);
      setModelCapacity(normalizedCapacity);
      setModelColor(normalizedColor);
    }
  }, [productId, category, navigate]);

  useEffect(() => {
    setModal(`${modelName}-${modelCapacity}-${modelColor}`);
  }, [modelName, modelCapacity, modelColor]);

  useEffect(() => {
    setIsLoading(true);

    getGoods(category)
      .then(setGoods)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  const product = goods.find(good => {
    return good.id === modal;
  });

  useEffect(() => {
    setMainPicture(product?.images[0]);
  }, [product]);

  const handleColorChange = (color: string) => {
    const normalizedColor = color.toLowerCase().replace(/\s+/g, '-');

    setModelColor(normalizedColor);
    navigate(`/${category}/${modelName}-${modelCapacity}-${normalizedColor}`, {
      replace: true,
    });
  };

  const handleCapacityChange = (capacity: string) => {
    const normalizedCapacity = capacity.toLowerCase();

    setModelCapacity(normalizedCapacity);
    navigate(`/${category}/${modelName}-${normalizedCapacity}-${modelColor}`, {
      replace: true,
    });
  };

  const handleMainPicture = (picture: string) => {
    setMainPicture(picture);
  };

  return (
    <main className="details">
      <ProductDetailsNav category={category} productId={modal} />
      {!isError && isLoading && <Loader />}
      {isError && !isLoading && <Error />}
      {!isError && !isLoading && product === undefined && <Error />}

      {!isError && !isLoading && product !== undefined && (
        <>
          <ProductDetailsList
            product={product}
            mainPicture={mainPicture}
            modelCapacity={modelCapacity}
            modelColor={modelColor}
            id={id?.id || ''}
            handleColorChange={handleColorChange}
            handleCapacityChange={handleCapacityChange}
            handleMainPicture={handleMainPicture}
          />
          <ProductDetailsSlider
            currentId={productId}
            modelName={modelName}
            modelCapacity={modelCapacity}
            modelColor={modelColor}
            category={category}
          />
        </>
      )}
    </main>
  );
};
