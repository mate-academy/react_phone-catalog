import type { TFunction } from 'i18next';

import type { HeroSliderData } from '@/components/organisms/HeroSlider';

import chip from '@/shared/assets/icons/Chip.svg';
import camera from '@/shared/assets/icons/Camera.svg';
import screen from '@/shared/assets/icons/Screen.svg';

import backgroundPhonesCategory from '@/shared/assets/images/phones_background.webp?no-inline';
import backgroundTabletsCategory from '@/shared/assets/images/tablets_background.webp?no-inline';
import backgroundAccessoriesCategory from '@/shared/assets/images/accessories_background.webp?no-inline';

import imagePhones from '@/shared/assets/images/phones.webp?no-inline';
import imageTablets from '@/shared/assets/images/tablets.webp?no-inline';
import imageAccessories from '@/shared/assets/images/accessories.webp?no-inline';

export const getHeroSliderData = (t: TFunction): HeroSliderData => ({
  slides: [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      accentTitle: t('heroNowInStore'),
      subtitle: t('heroProBeyond'),
      backgroundImage: backgroundPhonesCategory,
      image: imagePhones,
      buttonText: t('heroOrderNow'),
      buttonLink: '/phones/apple-iphone-14-pro-128gb-gold',
      features: [
        {
          icon: chip,
          title: t('heroChipTitle'),
          description: t('heroChipDescription'),
        },
        {
          icon: camera,
          title: t('heroCameraTitle'),
          description: t('heroCameraDescription'),
        },
        {
          icon: screen,
          title: t('heroScreenTitle'),
          description: t('heroScreenDescription'),
        },
      ],
      colorScheme: 'purple',
    },
    {
      id: 2,
      title: 'Apple Watch Series 6',
      accentTitle: t('heroWatchAccent'),
      subtitle: t('heroWatchSubtitle'),
      backgroundImage: backgroundAccessoriesCategory,
      image: imageAccessories,
      buttonText: t('heroOrderNow'),
      buttonLink: '/accessories/apple-watch-series-6-40mm-space-gray',
      features: [
        {
          icon: chip,
          title: t('heroWatchChipTitle'),
          description: t('heroWatchChipDescription'),
        },
        {
          icon: camera,
          title: t('heroWatchCameraTitle'),
          description: t('heroWatchCameraDescription'),
        },
        {
          icon: screen,
          title: t('heroWatchScreenTitle'),
          description: t('heroWatchScreenDescription'),
        },
      ],
      colorScheme: 'yellow',
    },
    {
      id: 3,
      title: 'iPad Pro 11″',
      accentTitle: t('heroIpadAccent'),
      subtitle: t('heroIpadSubtitle'),
      backgroundImage: backgroundTabletsCategory,
      image: imageTablets,
      buttonText: t('heroOrderNow'),
      buttonLink: '/tablets/apple-ipad-pro-11-2021-128gb-spacegray',
      features: [
        {
          icon: chip,
          title: t('heroIpadChipTitle'),
          description: t('heroIpadChipDescription'),
        },
        {
          icon: camera,
          title: t('heroIpadCameraTitle'),
          description: t('heroIpadCameraDescription'),
        },
        {
          icon: screen,
          title: t('heroIpadScreenTitle'),
          description: t('heroIpadScreenDescription'),
        },
      ],
      colorScheme: 'blue',
    },
  ],
});
