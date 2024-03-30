import React, { useEffect, useState } from 'react';
import { ProductsSlider } from '../../components/Content/ProductsSlider';
import { ShopByCategory } from '../../components/Content/ShopByCategory';
import { Sliderbar } from '../../components/Content/Sliderbar';
import { Products } from '../../type/Productes';
import { getProducts } from '../../api';

export const Home: React.FC = () => {
  const [produkts, setProdukts] = useState<Products[]>([]);
  const [produktsHotIndex, setProduktsHotIndex] = useState<number[]>([0, 4]);
  const [hotPrice, setHotPrice] = useState<Products[]>([]);
  const [produktsNewIndex, setProduktsNewIndex] = useState<number[]>([0, 4]);
  const [newProdukts, setNewProdukts] = useState<Products[]>([]);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      setProdukts(data);
    });
  }, []);

  useEffect(() => {
    const updatedHotPrice = produkts

      .sort((a, b) => b.price - a.price)
      .filter(produkt => produkt.price)
      .slice(produktsHotIndex[0], produktsHotIndex[1]);

    setHotPrice(updatedHotPrice);
  }, [produkts, produktsHotIndex]);

  useEffect(() => {
    const updatedNewPrice = produkts
      .sort((a, b) => b.year - a.year)
      .slice(produktsNewIndex[0], produktsNewIndex[1]);

    setNewProdukts(updatedNewPrice);
  }, [produkts, produktsNewIndex]);

  const handleHotClick = (click: string) => {
    const numProdukts = produkts.filter(produkt => produkt.price).length;

    setProduktsHotIndex((prevState: number[]) => {
      if (click === 'back') {
        if (prevState[0] === 0) {
          return prevState;
        }

        return [prevState[0] - 1, prevState[1] - 1];
      }

      if (prevState[1] === numProdukts) {
        return prevState;
      }

      return [prevState[0] + 1, prevState[1] + 1];
    });
  };

  const handleNewClick = (click: string) => {
    const numProdukts = produkts.filter(produkt => !produkt.price).length;

    setProduktsNewIndex((prevState: number[]) => {
      if (click === 'back') {
        if (prevState[0] === 0) {
          return prevState;
        }

        return [prevState[0] - 1, prevState[1] - 1];
      }

      if (prevState[1] === numProdukts) {
        return prevState;
      }

      return [prevState[0] + 1, prevState[1] + 1];
    });
  };

  if (!produkts) {
    return null;
  }

  return (
    <>
      <Sliderbar />
      <ProductsSlider
        produkts={hotPrice}
        title="Hot prices"
        handleClick={handleHotClick}
      />
      <ShopByCategory />
      <ProductsSlider
        produkts={newProdukts}
        title="Brand new models"
        handleClick={handleNewClick}
      />
    </>
  );
};
