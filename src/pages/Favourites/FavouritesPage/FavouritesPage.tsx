import React from 'react';
import styles from './FavouritesPage.module.scss';
import { FavouritesHeroSection } from '../FavouritesHeroSection';
import { BackButton } from '@/components/UI/BackButton';

export const FavouritesPage: React.FC = () => {
  return (
    <>
      <FavouritesHeroSection />
      <BackButton />
    </>
  );
};
