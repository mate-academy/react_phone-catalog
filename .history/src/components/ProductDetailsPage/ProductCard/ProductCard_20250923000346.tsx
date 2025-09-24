/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from './Product/Product';
import { About } from '../About';
import { TechSpecs } from './TechSpecs';
import { Gadget } from '../../../types/Gadget';
import { ProductsContext } from '../../../ProductsProvider';

type Props = {
  gadget: Gadget;
};

export const ProductCard: React.FC<Props> = ({ gadget }) => {
  const { phones, tablets, accessories } = useContext(ProductsContext);

  const [image, setImage] = useState(gadget.images[0]);
  const [color, setColor] = useState(gadget.color);
  const [capacity, setCapacity] = useState(gadget.capacity);

  const handleSelectImage = (newImage: string) => {
    setImage(newImage);
  };

  const handleSelectColor = (newColor: string) => {
    setColor(newColor);
  };

  const handleSelectCapacity = (newCapacity: string) => {
    setCapacity(newCapacity);
  };

  const selectedGadget = useMemo(() => {
    const allGadgets = [...phones, ...tablets, ...accessories];

    return (
      allGadgets.find(
        g => g.namespaceId === gadget.namespaceId && g.color === color && g.capacity === capacity,
      ) || gadget
    );
  }, [gadget, phones, tablets, accessories, capacity, color]);

  useEffect(() => {
    if (selectedGadget) {
      setImage(selectedGadget.images[0]);
    }
  }, [selectedGadget]);

  return (
    <div className={styles.container}>
      <Product
        gadget={selectedGadget}
        image={image}
        color={color}
        capacity={capacity}
        handleSelectImage={handleSelectImage}
        handleSelectColor={handleSelectColor}
        handleSelectCapacity={handleSelectCapacity}
      />

      <div className={styles.about}>
        <About gadget={selectedGadget} />
      </div>
      <div className={styles.specs}>
        <TechSpecs gadget={selectedGadget} />
      </div>
    </div>
  );
};
