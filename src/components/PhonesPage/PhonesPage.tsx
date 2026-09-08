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
export const phones: ExtendedProduct[] = [
  // Row 1
  {
    id: 1,
    uniqueId: 'phone-1',
    category: 'phones',
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
    uniqueId: 'phone-2',
    category: 'phones',
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
    uniqueId: 'phone-3',
    category: 'phones',
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
    uniqueId: 'phone-4',
    category: 'phones',
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
    uniqueId: 'phone-5',
    category: 'phones',
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
    uniqueId: 'phone-6',
    category: 'phones',
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
    uniqueId: 'phone-7',
    category: 'phones',
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
    uniqueId: 'phone-8',
    category: 'phones',
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
    uniqueId: 'phone-9',
    category: 'phones',
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
    uniqueId: 'phone-10',
    category: 'phones',
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
    uniqueId: 'phone-11',
    category: 'phones',
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
    uniqueId: 'phone-12',
    category: 'phones',
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
    uniqueId: 'phone-13',
    category: 'phones',
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
    uniqueId: 'phone-14',
    category: 'phones',
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
    uniqueId: 'phone-15',
    category: 'phones',
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
    uniqueId: 'phone-16',
    category: 'phones',
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Apply sorting to phones
  const sortedPhones = [...phones].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'newest':
      default:
        return b.id - a.id; // Assuming higher IDs are newer phones
    }
  });

  // Apply pagination
  const phonesPerPage = parseInt(itemsPerPage, 10);
  const startIndex = (currentPage - 1) * phonesPerPage;
  const displayedPhones = sortedPhones.slice(
    startIndex,
    startIndex + phonesPerPage,
  );

  // Calculate total pages based on actual phones array length
  const actualTotalPhones = phones.length;
  const totalPages = Math.ceil(actualTotalPhones / Number(itemsPerPage));

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
              className={
                'phones-page__pagination-arrow ' +
                'phones-page__pagination-prev'
              }
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>

            {(() => {
              // Logic to show only 4 pagination items
              let pagesToShow = [];

              if (totalPages <= 4) {
                // If total pages are 4 or less, show all
                pagesToShow = Array.from(
                  { length: totalPages },
                  (_, i) => i + 1,
                );
              } else {
                // If more than 4 pages, show a window of 4 around the current page
                if (currentPage <= 2) {
                  pagesToShow = [1, 2, 3, 4];
                } else if (currentPage >= totalPages - 1) {
                  pagesToShow = [
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  ];
                } else {
                  pagesToShow = [
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                  ];
                }
              }

              return pagesToShow.map(page => (
                <button
                  key={page}
                  className={`phones-page__pagination-item ${
                    page === currentPage
                      ? 'phones-page__pagination-item--active'
                      : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ));
            })()}

            <button
              className={
                'phones-page__pagination-arrow ' +
                'phones-page__pagination-next'
              }
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
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
