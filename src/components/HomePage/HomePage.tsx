import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Slider } from '../Slider/Slider';
import { ProductList } from '../ProductList/ProductList';
import { CategorySection } from '../CategorySection/CategorySection';
import './HomePage.scss';

// Import image paths
import bannerIphone14 from '../../assets/img/banners/Banner.png';
import bannerSamsungS23 from '../../assets/img/banners/Banner.png';

// Brand new models
import iphone14ProSilver from '../../assets/img/phones/14pro_Silver.png';
import iphone14ProPurple from '../../assets/img/phones/14pro_Purple.png';
import iphone14ProGold from '../../assets/img/phones/14pro_Gold.png';
import iphone14PlusRed from '../../assets/img/phones/14plus_Red.png';

// Hot prices
import iphone11ProMaxGreen from '../../assets/img/phones/11pro_max_Green.png';
import iphone11ProMaxGold from '../../assets/img/phones/11pro_max_Gold.png';
import iphone11Purple from '../../assets/img/phones/11_Purple.png';
import iphone11Red from '../../assets/img/phones/11_Red.png';

// Categories
/* eslint-disable max-len */
import categoryPhones from '../../assets/img/categories/first_Category-phone.png';
import categoryTablets from '../../assets/img/categories/second_Category-tablet.png';
import categoryAccessories from '../../assets/img/categories/third_Category-accs.png';
/* eslint-enable max-len */

export const HomePage: React.FC = () => {
  const sliderData = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      subtitle: 'Pro. Beyond.',
      image: bannerIphone14,
      buttonText: 'ORDER NOW',
      buttonLink: '/phones/apple-iphone-14-pro-128gb-silver',
    },
    {
      id: 2,
      title: 'Samsung Galaxy S23',
      subtitle: 'Epic Galaxy.',
      image: bannerSamsungS23,
      buttonText: 'VIEW MORE',
      buttonLink: '/phones/samsung-galaxy-s23-128gb-black',
    },
  ];

  const newModels = [
    {
      id: 1,
      category: 'phones',
      phoneId: 'apple-iphone-14-pro-128gb-silver',
      name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
      price: 999,
      image: iphone14ProSilver,
      screen: '6.1" OLED',
      capacity: '128 GB',
      ram: '6 GB',
      color: 'silver',
    },
    {
      id: 2,
      category: 'phones',
      phoneId: 'apple-iphone-14-pro-128gb-purple',
      name: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0D3)',
      price: 999,
      image: iphone14ProPurple,
      screen: '6.1" OLED',
      capacity: '128 GB',
      ram: '6 GB',
      color: 'purple',
    },
    {
      id: 3,
      category: 'phones',
      phoneId: 'apple-iphone-14-pro-128gb-gold',
      name: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
      price: 999,
      image: iphone14ProGold,
      screen: '6.1" OLED',
      capacity: '128 GB',
      ram: '6 GB',
      color: 'gold',
    },
    {
      id: 4,
      category: 'phones',
      phoneId: 'apple-iphone-14-plus-128gb-red',
      name: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ253)',
      price: 859,
      image: iphone14PlusRed,
      screen: '6.7" OLED',
      capacity: '128 GB',
      ram: '6 GB',
      color: 'red',
    },
  ];

  const hotPrices = [
    {
      id: 5,
      category: 'phones',
      phoneId: 'apple-iphone-11-pro-max-512gb-green',
      name: 'Apple iPhone 11 Pro Max 512GB Midnight Green (MWFJ2FS/A)',
      price: 849,
      oldPrice: 1199,
      image: iphone11ProMaxGreen,
      screen: '6.5" OLED',
      capacity: '512 GB',
      ram: '4 GB',
      color: 'green',
    },
    {
      id: 6,
      category: 'phones',
      phoneId: 'apple-iphone-11-pro-max-64gb-gold',
      name: 'Apple iPhone 11 Pro Max 64GB Gold (MWFJ2FS/A)',
      price: 799,
      oldPrice: 999,
      image: iphone11ProMaxGold,
      screen: '6.5" OLED',
      capacity: '64 GB',
      ram: '4 GB',
      color: 'gold',
    },
    {
      id: 7,
      category: 'phones',
      phoneId: 'apple-iphone-11-256gb-purple',
      name: 'Apple iPhone 11 256GB Purple (MWFJ2FS/A)',
      price: 729,
      oldPrice: 859,
      image: iphone11Purple,
      screen: '6.2" IPS',
      capacity: '256 GB',
      ram: '4 GB',
      color: 'purple',
    },
    {
      id: 8,
      category: 'phones',
      phoneId: 'apple-iphone-11-128gb-red',
      name: 'Apple iPhone 11 128GB (Product) Red (MWFJ2FS/A)',
      price: 699,
      oldPrice: 899,
      image: iphone11Red,
      screen: '6.2" IPS',
      capacity: '128 GB',
      ram: '4 GB',
      color: 'red',
    },
  ];

  const categories = [
    {
      id: 1,
      title: 'Mobile phones',
      image: categoryPhones,
      categoryLink: '/phones',
      itemCount: 95,
    },
    {
      id: 2,
      title: 'Tablets',
      image: categoryTablets,
      categoryLink: '/tablets',
      itemCount: 24,
    },
    {
      id: 3,
      title: 'Accessories',
      image: categoryAccessories,
      categoryLink: '/accessories',
      itemCount: 100,
    },
  ];

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__main">
        <div className="container">
          <section className="home-page__section">
            <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
            <Slider slides={sliderData} />
          </section>

          <section className="home-page__section">
            <ProductList title="Brand new models" products={newModels} />
          </section>

          <section className="home-page__section">
            <h2 className="home-page__section-title">Shop by category</h2>
            <div className="home-page__categories-grid">
              {categories.map(category => (
                <CategorySection
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  image={category.image}
                  categoryLink={category.categoryLink}
                  itemCount={category.itemCount}
                />
              ))}
            </div>
          </section>

          <section className="home-page__section">
            <ProductList title="Hot prices" products={hotPrices} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
