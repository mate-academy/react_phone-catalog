import { Product } from '../../../../types/Product';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './ProductDetails.scss';
import { DeatailsIamges } from './DetailsComponents/DetailsBlocks';
import { normalizeColor } from '../../../../utils/normalizeColors';

interface Props {
  product: Product | null;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeCapacity, setActiveCapacity] = useState<string>('');
  const [primaryImg, setPrimaryImg] = useState<string | null>(null);
  const [phonesStorge, setPhonesStorge] = useState<Product[]>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setPrimaryImg(product.images[0]);
      setActiveCapacity(product.capacity || '');
      setNewProduct(product);
      setActiveColor(product.color || '');
    }

    setPhonesStorge(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [product]);

  useEffect(() => {
    if (!product || !activeColor) {
      return;
    }

    const color = activeColor.replace(' ', '-');

    const parts = product.images[0].split('/');

    parts[3] = color;
    const updatedPrimaryImg = parts.join('/');

    setPrimaryImg(updatedPrimaryImg);
  }, [activeColor, product]);

  if (product === null) {
    return null;
  }

  const updateImagesWithColor = (color: string) => {
    if (!product) {
      return;
    }

    const dashColor = color.replace(' ', '-');

    const updatedImages = product.images.map(image => {
      const parts = image.split('/');

      parts[3] = dashColor; // 3-й сегмент — це колір у URL

      return parts.join('/');
    });

    setNewProduct(prev => {
      if (!prev) {
        return null;
      }

      return {
        ...prev,
        images: updatedImages,
      };
    });

    setPrimaryImg(updatedImages[0]); // щоб оновити активне велике зображення
  };

  const changeColor = (newColor: string) => {
    const oldColorInName = product.colorsAvailable.find(colorOption =>
      product.name.toLowerCase().includes(colorOption.toLowerCase()),
    );

    const updatedName = oldColorInName
      ? product.name.replace(new RegExp(oldColorInName, 'i'), newColor)
      : product.name;

    setNewProduct(prev => {
      if (!prev) {
        return null;
      }

      return {
        ...prev,
        color: newColor,
        name: updatedName,
      };
    });

    updateImagesWithColor(newColor);
    setActiveColor(newColor);
  };

  const setCapacity = (ram: string) => {
    const updatedName = product.name.replace(activeCapacity, ram);

    setNewProduct(prev => {
      if (!prev) {
        return null;
      }

      return {
        ...prev,
        capacity: ram,
        name: updatedName,
      };
    });

    setActiveCapacity(ram);
  };

  return (
    <article className="product-details">
      <div className="product-details-content">
        <div className="product-details__images">
          <img
            src={`/${primaryImg}`}
            alt="Primary-img"
            className="product-details__images-primary"
          />

          <ul className="product-details__images-list">
            {product.images.map(el => {
              const color = normalizeColor(activeColor);
              const parts = el.split('/');

              parts[3] = color;
              const imgSrc = parts.join('/');

              return (
                <li
                  key={el}
                  className={classNames('product-details__images-list-item', {
                    'primary-img': imgSrc === primaryImg,
                  })}
                  onClick={() => setPrimaryImg(imgSrc)}
                >
                  <img
                    src={`/${imgSrc}`}
                    alt="list-img"
                    className="product-details__images-list-item-img"
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <DeatailsIamges
          product={product}
          phonesStorge={phonesStorge}
          setCapacity={setCapacity}
          changeColor={changeColor}
          activeColor={activeColor}
          elementsCart={elementsCart}
          newProduct={newProduct}
          activeCapacity={activeCapacity}
          setPhonesStorge={setPhonesStorge}
          setElementsCart={setElementsCart}
        />
      </div>
    </article>
  );
};
