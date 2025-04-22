import React, { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Dropdown } from '../Dropdown/Dropdown';
import { Product } from '../../types/Product';
import './AccessoriesPage.scss';

// Using accessory images from the accs directory
import airpods from '../../assets/img/accs/airpods-pro-2.png';
import samsungBuds from '../../assets/img/accs/samsungpro.png';
import appleWatch from '../../assets/img/accs/watch49mm.png';
import samsungWatch from '../../assets/img/accs/watchsamsung.png';

// Import shared gallery images
import sharedImage1 from '../../assets/img/accs/airpods-pro-2.png';
import sharedImage2 from '../../assets/img/accs/samsungpro.png';
import sharedImage3 from '../../assets/img/accs/watch49mm.png';
import sharedImage4 from '../../assets/img/accs/watchsamsung.png';
import sharedImage6 from '../../assets/img/accs/airpods-pro-2.png';

// Shared gallery array for all accessories
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
  favorite?: boolean;
  inCart?: boolean;
}

// Accessories data with actual images
const accessories: ExtendedProduct[] = [
  // Row 1
  {
    id: 1,
    name: 'Apple AirPods Pro 2nd Generation',
    price: 249,
    oldPrice: 279,
    image: airpods,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 2,
    name: 'Samsung Galaxy Buds Pro',
    price: 199,
    oldPrice: 229,
    image: samsungBuds,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 3,
    name: 'Apple Watch Series 9 49mm',
    price: 429,
    oldPrice: 459,
    image: appleWatch,
    screen: '1.9" OLED',
    capacity: '64 GB',
    ram: '2 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 6 44mm',
    price: 299,
    oldPrice: 329,
    image: samsungWatch,
    screen: '1.5" AMOLED',
    capacity: '16 GB',
    ram: '2 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  // Row 2
  {
    id: 5,
    name: 'Apple AirPods Max Silver',
    price: 549,
    oldPrice: 599,
    image: airpods,
    screen: 'Over-ear',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 6,
    name: 'Samsung Galaxy Buds 2',
    price: 149,
    oldPrice: 179,
    image: samsungBuds,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 7,
    name: 'Apple Watch SE 40mm',
    price: 249,
    oldPrice: 279,
    image: appleWatch,
    screen: '1.6" OLED',
    capacity: '32 GB',
    ram: '1 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 8,
    name: 'Samsung Galaxy Watch 5 40mm',
    price: 249,
    oldPrice: 279,
    image: samsungWatch,
    screen: '1.4" AMOLED',
    capacity: '16 GB',
    ram: '1.5 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  // Row 3
  {
    id: 9,
    name: 'Apple AirPods 3rd Generation',
    price: 179,
    oldPrice: 199,
    image: airpods,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 10,
    name: 'Samsung Galaxy Buds Live',
    price: 169,
    oldPrice: 199,
    image: samsungBuds,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 11,
    name: 'Apple Watch Ultra 49mm',
    price: 799,
    oldPrice: 899,
    image: appleWatch,
    screen: '1.9" OLED',
    capacity: '64 GB',
    ram: '2 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 12,
    name: 'Samsung Galaxy Watch 4 Classic 46mm',
    price: 349,
    oldPrice: 399,
    image: samsungWatch,
    screen: '1.4" Super AMOLED',
    capacity: '16 GB',
    ram: '1.5 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  // Row 4
  {
    id: 13,
    name: 'Apple AirPods 2nd Generation',
    price: 129,
    oldPrice: 159,
    image: airpods,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 14,
    name: 'Samsung Galaxy Buds+',
    price: 149,
    oldPrice: 169,
    image: samsungBuds,
    screen: 'Wireless',
    capacity: 'N/A',
    ram: 'N/A',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 15,
    name: 'Apple Watch Series 8 45mm',
    price: 399,
    oldPrice: 429,
    image: appleWatch,
    screen: '1.9" OLED',
    capacity: '32 GB',
    ram: '1 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 16,
    name: 'Samsung Galaxy Watch 3 45mm',
    price: 299,
    oldPrice: 349,
    image: samsungWatch,
    screen: '1.4" Super AMOLED',
    capacity: '8 GB',
    ram: '1 GB',
    category: 'accessories',
    galleryImages: sharedGalleryImages,
  },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const itemsPerPageOptions = [
  { value: '16', label: '16' },
  { value: '8', label: '8' },
  { value: '4', label: '4' },
];

export const AccessoriesPage: React.FC = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize favorites state
  useEffect(() => {
    if (isInitialized) {
      return;
    }

    setIsInitialized(true);
  }, [isInitialized]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Apply sorting to accessories
  const sortedAccessories = [...accessories].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'newest':
      default:
        return b.id - a.id; // Assuming higher IDs are newer accessories
    }
  });

  // Apply pagination
  const accessoriesPerPage = parseInt(itemsPerPage, 10);
  const startIndex = (currentPage - 1) * accessoriesPerPage;
  const displayedAccessories = sortedAccessories.slice(
    startIndex,
    startIndex + accessoriesPerPage,
  );

  // Calculate total pages based on actual accessories array length
  const actualTotalAccessories = accessories.length;
  const totalPages = Math.ceil(actualTotalAccessories / Number(itemsPerPage));

  const breadcrumbItems = [{ label: 'Accessories' }];

  return (
    <div className="accessories-page">
      <Header />

      <main className="accessories-page__main">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="accessories-page__title">Accessories</h1>
          <p className="accessories-page__count">
            {actualTotalAccessories} models
          </p>

          <div className="accessories-page__filters">
            <Dropdown
              label="Sort by"
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              className="accessories-page__sort"
            />

            <Dropdown
              label="Items on page"
              options={itemsPerPageOptions}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="accessories-page__items-per-page"
            />
          </div>

          <div className="accessories-page__grid">
            {displayedAccessories.map(accessory => (
              <ProductCard key={accessory.id} {...accessory} />
            ))}
          </div>

          <div className="accessories-page__pagination">
            <button
              className={
                'accessories-page__pagination-arrow ' +
                'accessories-page__pagination-prev'
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
                  className={`accessories-page__pagination-item ${
                    page === currentPage
                      ? 'accessories-page__pagination-item--active'
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
                'accessories-page__pagination-arrow ' +
                'accessories-page__pagination-next'
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
