import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { getDescription, getProducts } from '../api/getData';
import { PhoneInfo } from '../type/PhoneInfo';
import { Products } from '../type/Products';
import { PhotoGallery } from '../components/PhotoGallery';
import { NavigationField } from '../components/NavigationField';
import { ShortInfo } from '../components/ShortInfo';
import { AboutSection } from '../components/AboutSection';
import { TechSpecsSection } from '../components/TechSpecsSection';
import { HistoryBackPusher } from '../components/HistoryBackPusher';
import { CatalogShortCut } from '../components/CatalogShortCut';

export const CardPage: React.FC = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProdcuts] = useState<Products[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null);
  const [description, setDescription] = useState<PhoneInfo | null>(null);

  const getData = async (id: string) => {
    try {
      setIsLoading(true);
      const responseForDescription = await getDescription(id);
      const responseForProductList = await getProducts();

      const getCurrentProduct = responseForProductList
        .find(product => product.itemId === id) || null;

      setDescription(responseForDescription);
      setProdcuts(responseForProductList);
      setCurrentProduct(getCurrentProduct);
      setIsLoading(false);
    } catch {
      throw new Error('Didn\'t catch data');
    }
  };

  useEffect(() => {
    if (params.id) {
      getData(params.id);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.id]);

  const randomProducts = [...products].sort(() => 0.5 - Math.random());

  if (description === null || currentProduct === null || isLoading) {
    return (
      <div className="container">
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className="container">
      <NavigationField />
      <HistoryBackPusher />
      <div className="description">
        <h1>{description.name}</h1>
        <div className="description__top">
          <PhotoGallery images={description.images} />
          <ShortInfo
            description={description}
            currentProduct={currentProduct}
          />
        </div>
      </div>
      <div className="description__content">
        <AboutSection description={description} />
        <TechSpecsSection description={description} />
      </div>
      <CatalogShortCut
        list={randomProducts}
        title="You may also like"
      />
    </div>
  );
};
