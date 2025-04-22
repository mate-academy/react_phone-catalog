import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Dropdown } from '../Dropdown/Dropdown';
import { Product } from '../../types/Product';
import './TabletsPage.scss';

// Using tablet images from the tables directory
import ipad2021 from '../../assets/img/tables/ipad2021.png';
import ipad2022 from '../../assets/img/tables/ipad2022.png';
import ipadPro from '../../assets/img/tables/idpad2022pro.png';
import ipadMini from '../../assets/img/tables/ipadmini.png';
import samsung from '../../assets/img/tables/samsung.png';
import samsung2 from '../../assets/img/tables/samsung2.png';
import huawei from '../../assets/img/tables/huawei.png';
import microsoft from '../../assets/img/tables/mircosoft.png';
import amazon from '../../assets/img/tables/amazon.png';
import google from '../../assets/img/tables/google.png';
import ipad512 from '../../assets/img/tables/512ipad.png';

// Import shared gallery images
import sharedImage1 from '../../assets/img/tables/ipad2021.png';
import sharedImage2 from '../../assets/img/tables/ipad2022.png';
import sharedImage3 from '../../assets/img/tables/idpad2022pro.png';
import sharedImage4 from '../../assets/img/tables/ipadmini.png';
import sharedImage6 from '../../assets/img/tables/samsung.png';

// Shared gallery array for all tablets
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

// Tablet data with images
const tablets: ExtendedProduct[] = [
  // Row 1
  {
    id: 1,
    name: 'Apple iPad 10.2" 64GB Space Gray (2021)',
    price: 329,
    oldPrice: 399,
    image: ipad2021,
    screen: '10.2" IPS',
    capacity: '64 GB',
    ram: '3 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 2,
    name: 'Apple iPad Air 10.9" 256GB Silver (2022)',
    price: 599,
    oldPrice: 749,
    image: ipad2022,
    screen: '10.9" Liquid Retina',
    capacity: '256 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 3,
    name: 'Apple iPad Pro 11" 128GB Space Gray (2022)',
    price: 799,
    oldPrice: 899,
    image: ipadPro,
    screen: '11" Liquid Retina',
    capacity: '128 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 4,
    name: 'Apple iPad mini 8.3" 64GB Purple (2021)',
    price: 499,
    oldPrice: 599,
    image: ipadMini,
    screen: '8.3" Liquid Retina',
    capacity: '64 GB',
    ram: '4 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  // Row 2
  {
    id: 5,
    name: 'Samsung Galaxy Tab S8 11" 128GB Graphite',
    price: 699,
    oldPrice: 799,
    image: samsung,
    screen: '11" LTPS',
    capacity: '128 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 6,
    name: 'Samsung Galaxy Tab S8+ 12.4" 256GB Silver',
    price: 899,
    oldPrice: 999,
    image: samsung2,
    screen: '12.4" Super AMOLED',
    capacity: '256 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 7,
    name: 'Samsung Galaxy Tab S8 Ultra 14.6" 512GB Graphite',
    price: 1199,
    oldPrice: 1399,
    image: samsung,
    screen: '14.6" Super AMOLED',
    capacity: '512 GB',
    ram: '16 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 8,
    name: 'Microsoft Surface Pro 9 13" 256GB Platinum',
    price: 999,
    oldPrice: 1099,
    image: microsoft,
    screen: '13" PixelSense Flow',
    capacity: '256 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  // Row 3
  {
    id: 9,
    name: 'Lenovo Tab P11 Pro 11.5" 128GB Storm Grey',
    price: 499,
    oldPrice: 599,
    image: ipad2021,
    screen: '11.5" OLED',
    capacity: '128 GB',
    ram: '6 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 10,
    name: 'Xiaomi Pad 5 11" 128GB Cosmic Gray',
    price: 349,
    oldPrice: 399,
    image: ipad2022,
    screen: '11" IPS',
    capacity: '128 GB',
    ram: '6 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 11,
    name: 'Huawei MatePad Pro 12.6" 256GB Olive Green',
    price: 749,
    oldPrice: 849,
    image: huawei,
    screen: '12.6" OLED',
    capacity: '256 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 12,
    name: 'Apple iPad Pro 12.9" 512GB Silver (2022)',
    price: 1399,
    oldPrice: 1499,
    image: ipad512,
    screen: '12.9" Liquid Retina XDR',
    capacity: '512 GB',
    ram: '16 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  // Row 4
  {
    id: 13,
    name: 'Amazon Fire HD 10 Plus 10.1" 64GB Black',
    price: 179,
    oldPrice: 219,
    image: amazon,
    screen: '10.1" IPS',
    capacity: '64 GB',
    ram: '4 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 14,
    name: 'Google Pixel Tablet 10.95" 256GB Porcelain',
    price: 599,
    oldPrice: 699,
    image: google,
    screen: '10.95" LCD',
    capacity: '256 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 15,
    name: 'OnePlus Pad 11.61" 128GB Halo Green',
    price: 479,
    oldPrice: 529,
    image: ipad2021,
    screen: '11.61" IPS',
    capacity: '128 GB',
    ram: '8 GB',
    category: 'tablets',
    galleryImages: sharedGalleryImages,
  },
  {
    id: 16,
    name: 'Apple iPad Air 10.9" 64GB Blue (2022)',
    price: 599,
    oldPrice: 649,
    image: ipad2022,
    screen: '10.9" Liquid Retina',
    capacity: '64 GB',
    ram: '8 GB',
    category: 'tablets',
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

export const TabletsPage: React.FC = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Apply sorting to tablets
  const sortedTablets = [...tablets].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'newest':
      default:
        return b.id - a.id; // Assuming higher IDs are newer tablets
    }
  });

  // Apply pagination
  const tabletsPerPage = parseInt(itemsPerPage, 10);
  const startIndex = (currentPage - 1) * tabletsPerPage;
  const displayedTablets = sortedTablets.slice(
    startIndex,
    startIndex + tabletsPerPage,
  );

  // Calculate total pages based on actual tablets array length
  const actualTotalTablets = tablets.length;
  const totalPages = Math.ceil(actualTotalTablets / Number(itemsPerPage));

  const breadcrumbItems = [{ label: 'Tablets' }];

  return (
    <div className="tablets-page">
      <Header />

      <main className="tablets-page__main">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="tablets-page__title">Tablets</h1>
          <p className="tablets-page__count">{actualTotalTablets} models</p>

          <div className="tablets-page__filters">
            <Dropdown
              label="Sort by"
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              className="tablets-page__sort"
            />

            <Dropdown
              label="Items on page"
              options={itemsPerPageOptions}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="tablets-page__items-per-page"
            />
          </div>

          <div className="tablets-page__grid">
            {displayedTablets.map(tablet => (
              <ProductCard key={tablet.id} {...tablet} />
            ))}
          </div>

          <div className="tablets-page__pagination">
            <button
              className={
                'tablets-page__pagination-arrow ' +
                'tablets-page__pagination-prev'
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
                  className={`tablets-page__pagination-item ${
                    page === currentPage
                      ? 'tablets-page__pagination-item--active'
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
                'tablets-page__pagination-arrow ' +
                'tablets-page__pagination-next'
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
