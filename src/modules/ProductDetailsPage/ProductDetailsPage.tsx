/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMyContext } from '../../Context/ProductContexts';
import { useEffect, useState } from 'react';
import { ProductFullInfo } from '../../types/ProductFullInfo';
import { ProductDemo } from '../../types/ProductDemo';
import { BurgerMenu } from '../BurgerMenu';
import { client } from '../../fetch/fetchGoods';
import { useMediaQuery } from '../../Services/UseMediaQuery';
import { Action } from '../../types/Action';
import { breakpoints } from '../../Services/MediaBreakpoints';
import { DetailsContent } from './DetailsContent';
import { NavBar } from '../../shared/NavBar';
import { Loader } from '../../shared/Loader';
import { ErrorMessage } from '../../shared/ErrorMessage';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    isMenuOpen,
    setIPhones,
    setTablets,
    setAccessories,
    isLoading,
    setIsLoading,
    setIsError,
    setAddIsPressed,
    setHeartIsPressed,
  } = useMyContext();

  const { productId } = useParams();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [activeHeart, setActiveHeart] = useState(false);
  const [activeAdd, setActiveAdd] = useState(false);
  const [suggestedList, setSuggestedList] = useState<ProductDemo[]>([]);
  const [fullInfoList, setFullInfoList] = useState<ProductFullInfo[]>([]);
  const [chosedItem, setChosedItem] = useState<ProductFullInfo>();
  const [newProduct, setNewProduct] = useState<boolean>(false);

  // const chosedItem = fullInfoList.find(item => item.id === productId);
  const chosedItemDemo = products.find(product => product.itemId === productId);

  const updateList = (item: ProductDemo, direction: Action) => {
    const chosedID = item.itemId;

    switch (direction) {
      case 'toCart':
        const existingOrder = localStorage.getItem(`cart_${chosedID}`);

        if (existingOrder) {
          setAddIsPressed(prev => !prev);

          return;
        } else {
          localStorage.setItem(`cart_${chosedID}`, JSON.stringify(item));
          setAddIsPressed(prev => !prev);

          setActiveAdd(true);
        }

        break;
      case 'toFavorite':
        const existingProduct = localStorage.getItem(chosedID);

        if (existingProduct) {
          localStorage.removeItem(chosedID);

          setActiveHeart(false);
          setHeartIsPressed(prev => !prev);
        } else {
          localStorage.setItem(chosedID, JSON.stringify(item));

          setActiveHeart(true);
          setHeartIsPressed(prev => !prev);
        }

        break;
    }
  };

  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`);

  useEffect(() => {
    const makeFullList = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const iphoneList = await client.fetchIPhones();
        const tabletList = await client.fetchTablets();
        const accessoryList = await client.fetchAccessories();
        const productsList = await client.fetchProducts();

        const suggestedProducts = [...productsList]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        const fullData = [...iphoneList, ...tabletList, ...accessoryList];
        const foundProduct = fullData.find(item => item.id === productId);

        setSuggestedList(suggestedProducts);
        setIPhones(iphoneList);
        setTablets(tabletList);
        setAccessories(accessoryList);
        setFullInfoList(fullData);
        if (foundProduct) {
          setChosedItem(foundProduct);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    makeFullList();
  }, [newProduct]);

  useEffect(() => {
    setSelectedImage(chosedItem ? chosedItem.images[0] : null);

    setSelectedColor(chosedItem ? chosedItem.color : '');
    setSelectedCapacity(chosedItem ? chosedItem.capacity : '');
  }, [fullInfoList, chosedItem]);

  useEffect(() => {
    const checkTheStorage = () => {
      if (!chosedItemDemo) {
        return;
      }

      const favoriteInStorage = localStorage.getItem(chosedItemDemo.itemId);

      if (favoriteInStorage) {
        setActiveHeart(true);
      } else {
        setActiveHeart(false);
      }

      const orderInStorage = localStorage.getItem(
        `cart_${chosedItemDemo.itemId}`,
      );

      if (orderInStorage) {
        setActiveAdd(true);
      } else {
        setActiveAdd(false);
      }
    };

    checkTheStorage();
  }, [activeHeart, activeAdd]);

  return isMenuOpen ? (
    <BurgerMenu />
  ) : (
    <>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : chosedItem ? (
        <DetailsContent
          chosedItem={chosedItem}
          setChosedItem={setChosedItem}
          fullInfoList={fullInfoList}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedCapacity={selectedCapacity}
          setSelectedCapacity={setSelectedCapacity}
          activeAdd={activeAdd}
          setActiveAdd={setActiveAdd}
          activeHeart={activeHeart}
          setActiveHeart={setActiveHeart}
          chosedItemDemo={chosedItemDemo}
          updateList={updateList}
          suggestedList={suggestedList}
          isTablet={isTablet}
          setNewProduct={setNewProduct}
        />
      ) : (
        <ErrorMessage notFound={true} />
      )}
    </>
  );
};
