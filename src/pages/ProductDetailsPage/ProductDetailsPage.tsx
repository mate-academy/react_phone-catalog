import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ProductSwiper } from '../../components/ProductSwiper';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductControls } from '../../components/ProductControls';
import { TechSpecs } from '../../components/techSpecs';
import { Description } from '../../components/Description/Description';

import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import { Accessories } from '../../types/Accessories';
import { Product } from '../../types/Product';

import { useCart } from '../../context/CartContext';

import styles from './ProductDetailsPage.module.scss';

type ProductType = Phones | Tablets | Accessories;

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, favorites } = useCart();

  const [phones, setPhones] = useState<Phones[]>([]);
  const [tablets, setTablets] = useState<Tablets[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phonesResponse = await fetch(
          `${import.meta.env.BASE_URL}/api/phones.json`,
        );
        const phonesData = await phonesResponse.json();

        setPhones(phonesData);

        const tabletsResponse = await fetch(
          `${import.meta.env.BASE_URL}/api/tablets.json`,
        );
        const tabletsData = await tabletsResponse.json();

        setTablets(tabletsData);

        const accessoriesResponse = await fetch(
          `${import.meta.env.BASE_URL}/api/accessories.json`,
        );
        const accessoriesData = await accessoriesResponse.json();

        setAccessories(accessoriesData);

        const productsResponse = await fetch(
          `${import.meta.env.BASE_URL}/api/products.json`, // Виправлено
        );
        const productsData = await productsResponse.json();

        setProducts(productsData);
      } catch (error) {
        alert('Failed to fetch product data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setAllProducts([...phones, ...tablets, ...accessories]);
  }, [phones, tablets, accessories]);

  const product = allProducts.find(item => item.id === id);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedColor(product.color);
      setSelectedCapacity(product.capacity);
    }
  }, [product]);

  useEffect(() => {
    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product?.namespaceId &&
        p.color === selectedColor &&
        p.capacity === selectedCapacity,
    );

    if (newProduct && newProduct.id !== id) {
      navigate(`/${product?.category}/${newProduct.id}`);
    }
  }, [
    selectedColor,
    selectedCapacity,
    allProducts,
    id,
    navigate,
    product?.namespaceId,
    product?.category,
  ]);

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const getBaseName = (name: string) => {
    const words = name.split(' ');

    return words.slice(0, words.length - 3).join(' ');
  };

  const baseName = getBaseName(product.name);

  const relatedProducts = products
    .filter(
      item =>
        item.category !== product.category &&
        getBaseName(item.name) !== baseName,
    )
    .sort((a, b) => b.price - a.price);

  return (
    <div className={styles.product}>
      <Breadcrumbs category={product.category} name={product.name} />
      <BackButton category={product.category} />
      <h2 className={styles.product__title}>{product.name}</h2>
      <div className={styles.product__group}>
        <ProductGallery
          images={product.images}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
        />
        <ProductControls
          product={product}
          selectedColor={selectedColor}
          selectedCapacity={selectedCapacity}
          isInCart={cart.some(item => item.itemId === product.id)}
          isInFavorites={favorites.some(item => item.itemId === product.id)}
          handleColorChange={handleColorChange}
          handleCapacityChange={handleCapacityChange}
        />
      </div>
      <Description product={product} />
      <TechSpecs product={product} />
      <ProductSwiper name="You may also like" products={relatedProducts} />
    </div>
  );
};
