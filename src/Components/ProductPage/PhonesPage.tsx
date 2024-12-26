/* eslint-disable @typescript-eslint/indent */
import { Link, useSearchParams } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import phonesPage from './ProductPage.module.scss';
import { useContext, useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsFilter } from '../ProductsFilter/ProductsFilter';
import { FilterType } from '../types/FilterType';
import { CatalogContext } from '../CatalogProvider';
import { ItemPerPage } from '../types/ItemPerPage';
import { Pagination } from '../Pagination/Pagination';
import { SkeletonProductCard } from '../ProductCard/SkeletonProductCard';

export const PhonesPage = () => {
  const { products, setProducts, phones, pageNumber, loading } =
    useContext(CatalogContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const queries = searchParams.get('query') || '';
  const sortOptions = searchParams.get('sort') || '';
  const items = searchParams.get('perPage') || '';
  const numberOfPage = searchParams.get('page') || '';
  const itemsInNumber = parseInt(items);

  const filteredOptions = (allPhones: string) => {
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

  const filterPhones = filteredOptions(sortOptions);

  const filteredPhones = filterPhones.filter(phone => {
    const serchedText = `${phone.capacity}${phone.price}${phone.color}${phone.name}${phone.ram}${phone.screen}`;

    return serchedText
      .toLowerCase()
      .trim()
      .includes(queries.trim().toLowerCase());
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

  const getVisibleItems = (itemsOptions: ItemPerPage) => {
    switch (itemsOptions) {
      case ItemPerPage.ALL:
        return filteredPhones;
      case ItemPerPage.SIXTEEN_PER_PAGE:
      case ItemPerPage.EIGHT_PER_PAGE:
      case ItemPerPage.FOUR_PER_PAGE:
      case ItemPerPage.TWO_PER_PAGE:
        return filteredPhones.slice(
          (pageNumber - 1) * itemsInNumber,
          pageNumber * itemsInNumber,
        );
      default:
        return filteredPhones;
    }
  };

  const getSkeleton = (skeletonItems: number) => {
    const array: number[] = [];

    if (Number.isNaN(skeletonItems)) {
      for (let i = 1; i < 124; i++) {
        array.push(i);
      }

      return array;
    }

    for (let i = 1; i < skeletonItems; i++) {
      array.push(i);
    }

    return array;
  };

  return (
    <>
      <Navigation />
      <div className={phonesPage.productpage}>
        <div className={phonesPage.breadcrumbs}>
          <Link to="/" className={phonesPage.breadcrumbs__link} />
          <div className={phonesPage.breadcrumbs__text}>{'>'} Phones</div>
        </div>

        <h1 className={phonesPage.header}>Mobile phones</h1>
        <span
          className={phonesPage.amountofmodels}
        >{`${filteredPhones.length} ${filteredPhones.length === 1 ? 'model' : 'models'}`}</span>
        <ProductsFilter
          queries={queries}
          setParams={setSearchParams}
          sort={sortOptions}
          perPage={items}
        />

        {loading && getVisibleItems(itemsInNumber).length === 0 ? (
          <div className={phonesPage.content}>
            {getSkeleton(itemsInNumber).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        ) : (
          <div className={phonesPage.content}>
            {getVisibleItems(itemsInNumber).map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
        {!getVisibleItems(itemsInNumber).length && queries && (
          <h1 className={phonesPage.noresults}>
            There are not phones matching the query ...{' '}
          </h1>
        )}
      </div>

      {!Number.isNaN(itemsInNumber) &&
        filteredPhones.length > itemsInNumber && (
          <Pagination
            filteredItems={filteredPhones}
            itemsInNumber={itemsInNumber}
            number={numberOfPage}
            setSearchParams={setSearchParams}
          />
        )}
      <Footer />
    </>
  );
};
