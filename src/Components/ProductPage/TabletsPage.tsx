import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import './ProductPage.scss';
import { useContext, useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsFilter } from '../ProductsFilter/ProductsFilter';
import { FilterType } from '../types/FilterType';
import { CatalogContext } from '../CatalogProvider';
import { ItemPerPage } from '../types/ItemPerPage';
import { Pagination } from '../Pagination/Pagination';

export const TabletsPage = () => {
  const {
    products,
    setProducts,
    tablets,
    filter,
    query,
    itemsPerPage,
    slidePages,
    pageNumber,
  } = useContext(CatalogContext);

  const filteredOptions = (allTablets: FilterType) => {
    const selectedProducts = products.filter(
      product => product.category === 'tablets',
    );

    switch (allTablets) {
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

  const filterTablets = filteredOptions(filter);

  const filteredTablets = filterTablets.filter(tablet => {
    const searchedText = `${tablet.capacity}${tablet.price}${tablet.color}${tablet.name}${tablet.ram}${tablet.screen}`;

    return searchedText
      .toLowerCase()
      .trim()
      .includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    const fullProductData = products.map(product => {
      const appropriateTablet = tablets.find(
        tablet => tablet.id === product.itemId,
      );

      return {
        ...product,
        ProductData: appropriateTablet || null,
      };
    });

    setProducts(fullProductData);
  }, []);

  const rest =
    filteredTablets.length -
    Math.floor(filteredTablets.length / +itemsPerPage) * +itemsPerPage;

  const amountOfPages = Math.ceil(filteredTablets.length / +itemsPerPage);

  const setItemsPerPage = (perPage: ItemPerPage) => {
    switch (perPage) {
      case ItemPerPage.ALL:
        return filteredTablets.length;
      case ItemPerPage.SIXTEEN_PER_PAGE:
        return 16;
      case ItemPerPage.EIGHT_PER_PAGE:
        return 8;
      case ItemPerPage.FOUR_PER_PAGE:
        return 4;
      case ItemPerPage.TWO_PER_PAGE:
        return 2;
      default:
        return filterTablets.length;
    }
  };

  return (
    <>
      <Navigation />
      <div className="productpage">
        <Link to="/home" className="phonespage__breadcrumbs--link">
          <div className="productpage__breadcrumbs--image"></div>
        </Link>
        <div className="productpage__breadcrumbs--category"> {'>'} Tablets</div>

        <h1 className="productpage__header">Tablets</h1>
        <span className="productpage__amountofmodels">{`${tablets.length} models`}</span>
        <ProductsFilter />
        <div
          className="productpage__content"
          style={{
            transform: `translateX(${slidePages}px)`,
            height: `${amountOfPages === pageNumber ? rest * 490 + (rest - 1) * 16 + 50 : setItemsPerPage(itemsPerPage) * 490 + (setItemsPerPage(itemsPerPage) - 1) * 16 + 50}px`,
          }}
        >
          {filteredTablets.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      {itemsPerPage !== ('1' as ItemPerPage) && (
        <Pagination filteredItems={filteredTablets} />
      )}
      <Footer />
    </>
  );
};
