import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import './ProductPage.scss';
import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsFilter } from '../ProductsFilter/ProductsFilter';
import { FilterType } from '../types/FilterType';
import { CatalogContext } from '../CatalogProvider';
import { ItemPerPage } from '../types/ItemPerPage';

export const PhonesPage = () => {
  const {
    products,
    setProducts,
    phones,
    filter,
    query,
    itemsPerPage,
    slidePages,
    setSlidePages,
  } = useContext(CatalogContext);
  const [pageNumber, setPageNumber] = useState(0);

  const filteredOptions = (allPhones: FilterType) => {
    const selectedProducts = products.filter(
      product => product.category === 'phones',
    );

    switch (allPhones) {
      case FilterType.TheMostExpensive:
        return selectedProducts.sort((a, b) => b.price - a.price);
      case FilterType.TheCheapest:
        return selectedProducts.sort((a, b) => a.price - b.price);
      case FilterType.Allphabetically:
        return selectedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case FilterType.AllphabeticallyDescending:
        return selectedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case FilterType.TheNewest:
        return selectedProducts.sort((a, b) => b.year - a.year);
      case FilterType.TheOldest:
        return selectedProducts.sort((a, b) => a.year - b.year);
      case FilterType.GoldColor:
        return selectedProducts.filter(phone => phone.color === 'gold');
      case FilterType.BlackColor:
        return selectedProducts.filter(phone => phone.color === 'black');
      case FilterType.GraphiteColor:
        return selectedProducts.filter(phone => phone.color === 'graphite');
      case FilterType.RedGoldColor:
        return selectedProducts.filter(phone => phone.color === 'redgold');
      case FilterType.SierrablueColor:
        return selectedProducts.filter(phone => phone.color === 'sierrablue');
      case FilterType.SpaceBlackColor:
        return selectedProducts.filter(phone => phone.color === 'spaceblack');
      case FilterType.RedColor:
        return selectedProducts.filter(phone => phone.color === 'red');
      case FilterType.WhiteColor:
        return selectedProducts.filter(phone => phone.color === 'white');
      case FilterType.YellowColor:
        return selectedProducts.filter(phone => phone.color === 'yellow');
      case FilterType.Capacity_32_GB:
        return selectedProducts.filter(phone => phone.capacity === '32GB');
      case FilterType.Capacity_64_GB:
        return selectedProducts.filter(phone => phone.capacity === '64GB');
      case FilterType.Capacity_128_GB:
        return selectedProducts.filter(phone => phone.capacity === '128GB');
      case FilterType.Capacity_256_GB:
        return selectedProducts.filter(phone => phone.capacity === '256GB');
      case FilterType.Capacity_512_GB:
        return selectedProducts.filter(phone => phone.capacity === '512GB');
      case FilterType.Capacity_1_TB:
        return selectedProducts.filter(phone => phone.capacity === '1TB');
      case FilterType.AllPhones:
        return selectedProducts;
      default:
        return selectedProducts;
    }
  };

  const filterPhones = filteredOptions(filter);

  const filteredPhones = filterPhones.filter(phone => {
    const serchedText = `${phone.capacity}${phone.price}${phone.color}${phone.name}${phone.ram}${phone.screen}`;

    return serchedText
      .toLowerCase()
      .trim()
      .includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    const fullProductData = products.map(product => {
      const appropriatePhone = phones.find(
        phone => phone.id === product.itemId,
      );

      return {
        ...product,
        ProductData: appropriatePhone || null,
      };
    });

    setProducts(fullProductData);
  }, []);

  const useItemsPerPage = (perPage: ItemPerPage) => {
    switch (perPage) {
      case ItemPerPage.ALL:
        return 'productpage__content';
      case ItemPerPage.TWO_PER_PAGE:
        return 'productpage__content productpage__content--2-per-page';
      case ItemPerPage.FOUR_PER_PAGE:
        return 'productpage__content productpage__content--4-per-page';
      case ItemPerPage.EIGHT_PER_PAGE:
        return 'productpage__content productpage__content--8-per-page';
      case ItemPerPage.SIXTEEN_PER_PAGE:
        return 'productpage__content productpage__content--16-per-page';
      default:
        return ItemPerPage.ALL;
    }
  };

  const amountOfPages = Math.floor(filterPhones.length / +itemsPerPage);

  const getPagination = (pages: number) => {
    const pagination: number[] = [];

    for (let i = 1; i <= pages; i++) {
      pagination.push(i);
    }

    return pagination;
  };

  const pagination = getPagination(amountOfPages);

  // console.log(slidePages);
  // console.log(itemsPerPage);
  // console.log(Math.floor(filterPhones.length / +itemsPerPage));
  // console.log(pageNumber);

  return (
    <>
      <Navigation />
      <div className="productpage">
        <Link to="/home" className="productpage__breadcrumbs--link">
          <div className="productpage__breadcrumbs--image"></div>
        </Link>
        <div className="productpage__breadcrumbs--category"> {'>'} Phones</div>

        <h1 className="productpage__header">Mobile phones</h1>
        <span className="productpage__amountofmodels">{`${phones.length} models`}</span>
        <ProductsFilter />
        <div
          style={{ transform: `translateX(${slidePages}px)` }}
          className={useItemsPerPage(itemsPerPage)}
        >
          {filteredPhones.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      {itemsPerPage !== ('all' as ItemPerPage) && (
        <>
          <button
            className="productpage__arrowprev"
            onClick={() => {
              setPageNumber(pageNumber - 1);
              if (slidePages === 0) {
                setPageNumber(0);

                return;
              }

              setSlidePages(slidePages + 303);
            }}
          ></button>
          <div className="productpage__pagination">
            {pagination.map(page => (
              <button key={page}>{page}</button>
            ))}
          </div>
          <button
            className="productpage__arrownext"
            onClick={() => {
              if (pageNumber < amountOfPages) {
                setPageNumber(pageNumber + 1);
                setSlidePages(slidePages - 303);
              }

              return pageNumber - 1;
            }}
          ></button>
        </>
      )}
      <Footer />
    </>
  );
};
