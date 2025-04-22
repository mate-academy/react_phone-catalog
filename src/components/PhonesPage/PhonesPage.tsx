import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Dropdown } from '../Dropdown/Dropdown';
import { Product } from '../../types/Product';
import './PhonesPage.scss';

// Import phone images
import iphone10Silver from '../../assets/img/phones/10_Silver.png';
import iphone11Red from '../../assets/img/phones/11_Red.png';
import iphone11Purple from '../../assets/img/phones/11_Purple.png';
import iphone11ProMaxGold from '../../assets/img/phones/11pro_max_Gold.png';
import iphone11ProMaxGreen from '../../assets/img/phones/11pro_max_Green.png';
import iphone14PlusRed from '../../assets/img/phones/14plus_Red.png';
import iphone14ProGold from '../../assets/img/phones/14pro_Gold.png';
import iphone14ProPurple from '../../assets/img/phones/14pro_Purple.png';
import iphone14ProSilver from '../../assets/img/phones/14pro_Silver.png';

// Import shared gallery images
import sharedImage1 from '../../assets/img/main_card/1.png';
import sharedImage2 from '../../assets/img/main_card/2.png';
import sharedImage3 from '../../assets/img/main_card/3.png';
import sharedImage4 from '../../assets/img/main_card/4.png';
import sharedImage6 from '../../assets/img/main_card/6.png';

// Shared gallery array for all phones
const sharedGalleryImages = [
  sharedImage1,
  sharedImage2,
  sharedImage3,
  sharedImage4,
  sharedImage6,
];

// Extended Product type to include additional properties
interface ExtendedProduct extends Product {
  galleryImages?: string[];
}

// Phone data based on the images
const phones: ExtendedProduct[] = [
  // Row 1
  {
    id: 1,
    name: 'Apple iPhone Xs 64GB Silver (MT9G2FS/A)',
    price: 799,
    oldPrice: 899,
    image: iphone10Silver,
    screen: '5.8" OLED',
    capacity: '64 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 2,
    name: 'Apple iPhone 11 Pro Max 64GB Gold (MT9G2FS/A)',
    price: 799,
    oldPrice: 1199,
    image: iphone11ProMaxGold,
    screen: '6.5" OLED',
    capacity: '64 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 3,
    name: 'Apple iPhone 11 128GB Purple (MT9G2FS/A)',
    price: 799,
    oldPrice: 899,
    image: iphone11Purple,
    screen: '6.2" IPS',
    capacity: '128 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 4,
    name: 'Apple iPhone X 256GB Silver (MT9G2FS/A)',
    price: 859,
    oldPrice: 899,
    image: iphone10Silver,
    screen: '5.8" OLED',
    capacity: '256 GB',
    ram: '3 GB',
    galleryImages: sharedGalleryImages,
  },
  // Row 2
  {
    id: 5,
    name: 'Apple iPhone 11 128GB Red (MT9G2FS/A)',
    price: 799,
    oldPrice: 899,
    image: iphone11Red,
    screen: '6.1" IPS',
    capacity: '128 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 6,
    name: 'Apple iPhone 11 Pro Max 256GB Green (MT9G2FS/A)',
    price: 949,
    oldPrice: 1299,
    image: iphone11ProMaxGreen,
    screen: '6.5" OLED',
    capacity: '256 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 7,
    name: 'Apple iPhone 14 Plus 128GB Red (MT9G2FS/A)',
    price: 899,
    oldPrice: 999,
    image: iphone14PlusRed,
    screen: '6.7" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 8,
    name: 'Apple iPhone 14 Pro 128GB Silver (MT9G2FS/A)',
    price: 999,
    oldPrice: 1099,
    image: iphone14ProSilver,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    galleryImages: sharedGalleryImages,
  },
  // Row 3
  {
    id: 9,
    name: 'Apple iPhone 14 Pro 128GB Gold (MT9G2FS/A)',
    price: 999,
    oldPrice: 1099,
    image: iphone14ProGold,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 10,
    name: 'Apple iPhone 14 Pro 128GB Purple (MT9G2FS/A)',
    price: 999,
    oldPrice: 1099,
    image: iphone14ProPurple,
    screen: '6.1" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 11,
    name: 'Apple iPhone Xs 128GB Silver (MT9G2FS/A)',
    price: 749,
    oldPrice: 849,
    image: iphone10Silver,
    screen: '5.8" OLED',
    capacity: '128 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 12,
    name: 'Apple iPhone 11 256GB Purple (MT9G2FS/A)',
    price: 849,
    oldPrice: 949,
    image: iphone11Purple,
    screen: '6.1" IPS',
    capacity: '256 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  // Row 4
  {
    id: 13,
    name: 'Apple iPhone 11 256GB Red (MT9G2FS/A)',
    price: 849,
    oldPrice: 949,
    image: iphone11Red,
    screen: '6.1" IPS',
    capacity: '256 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 14,
    name: 'Apple iPhone 11 Pro Max 512GB Gold (MT9G2FS/A)',
    price: 1099,
    oldPrice: 1399,
    image: iphone11ProMaxGold,
    screen: '6.5" OLED',
    capacity: '512 GB',
    ram: '4 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 15,
    name: 'Apple iPhone 14 Pro 256GB Purple (MT9G2FS/A)',
    price: 1099,
    oldPrice: 1199,
    image: iphone14ProPurple,
    screen: '6.1" OLED',
    capacity: '256 GB',
    ram: '6 GB',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 16,
    name: 'Apple iPhone 14 Plus 256GB Red (MT9G2FS/A)',
    price: 999,
    oldPrice: 1099,
    image: iphone14PlusRed,
    screen: '6.7" OLED',
    capacity: '256 GB',
    ram: '6 GB',
    galleryImages: sharedGalleryImages,
  },
];

export const PhonesPage: React.FC = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Sort phones based on selected sort option
  const sortedPhones = [...phones].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id - a.id;
    }

    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }

    return 0;
  });

  // Calculate pagination
  const phonesPerPage = parseInt(itemsPerPage, 10);
  const totalPages = Math.ceil(sortedPhones.length / phonesPerPage);
  const startIndex = (currentPage - 1) * phonesPerPage;
  const displayedPhones = sortedPhones.slice(
    startIndex,
    startIndex + phonesPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate pagination buttons
  const paginationButtons = [];
  
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`phones-page__pagination-button ${
          i === currentPage ? 'phones-page__pagination-button--active' : ''
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="phones-page">
      <Header />

      <main className="phones-page__main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Home', link: '/' },
              { label: 'Phones', link: '/phones' },
            ]}
          />

          <h1 className="phones-page__title">Mobile phones</h1>
          <p className="phones-page__count">{phones.length} models</p>

          <div className="phones-page__filters">
            <div className="phones-page__filter">
              <p className="phones-page__filter-title">Sort by</p>
              <Dropdown
                label="Sort by"
                options={[
                  { value: 'newest', label: 'Newest' },
                  { value: 'alphabetically', label: 'Alphabetically' },
                  { value: 'cheapest', label: 'Cheapest' },
                ]}
                value={sortBy}
                onChange={handleSortChange}
              />
            </div>

            <div className="phones-page__filter">
              <p className="phones-page__filter-title">Items on page</p>
              <Dropdown
                label="Items on page"
                options={[
                  { value: '4', label: '4' },
                  { value: '8', label: '8' },
                  { value: '16', label: '16' },
                  { value: '32', label: '32' },
                ]}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              />
            </div>
          </div>

          <div className="phones-page__grid">
            {displayedPhones.map(phone => (
              <ProductCard key={phone.id} {...phone} />
            ))}
          </div>

          <div className="phones-page__pagination">
            <button
              className="phones-page__pagination-button phones-page__pagination-button--arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {paginationButtons}

            <button
              className="phones-page__pagination-button phones-page__pagination-button--arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
