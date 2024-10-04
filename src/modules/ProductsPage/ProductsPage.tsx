import { useState } from "react";
import { useAppSelector } from "../../hooks/hookStore";
import BreadCrumbs from "../_shared/BreadCrumbs/BreadCrumbs";
import { ModelsStyled, ProductListStyled, ProductsPageStyled, SelectFixInput, SelectFixSecond, SelectsStyled, TitleStyled } from "./styled";
import { useTranslation } from "react-i18next";
import { StrCode } from "../../utils/enums";
import { SelectInput } from "../../components/Inputs/SelectInput/SelectInput";
import ProductCard from "../_shared/productCard/ProductCard";

type Props = {
  variant: 'phones' | 'tabless' | 'accesories';
}

const ProductsPage: React.FC<Props> = ({ variant }) => {
  const { products } = useAppSelector(state => state.products);
  const [valueSort, setValueSort] = useState('Newest');
  const [valuePerPage, setValuePerPage] = useState('16');
  const { t } = useTranslation();
  const [currentPage] = useState(1);

  const sortedAndPaginatedProducts = () => {
    const productsUsed = products.filter((item) => {
      switch (variant) {
        case 'phones':
          return item.category === 'phones';
        case 'accesories':
          return item.category === 'accessories';
        case 'tabless':
          return item.category === 'tablets';
      }
    });

    let sortedProducts = [...productsUsed];

    switch (valueSort) {
      case 'Newest':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'Alphabetically':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Cheapest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    if (valuePerPage === 'all') {
      return sortedProducts;
    } else {
      const perPage = Number(valuePerPage)
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      return sortedProducts.slice(startIndex, endIndex);
    }
  };


  const FirstTitleH1 = {
    phones: 'Phones page',
    tabless: 'Tablets page',
    accesories: 'Accessories page',
  };

  const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];
  const itemOnPage = ['4', '8', '16', 'all'];

  return (
    <div>
      <h1 style={{ display: 'none' }}>{FirstTitleH1[variant]}</h1>

      <ProductsPageStyled>
        <BreadCrumbs />

        <TitleStyled>
          {t(StrCode.MobilePhones)}
        </TitleStyled>

        <ModelsStyled>
          {`${sortedAndPaginatedProducts().length} ${t(StrCode.Models)}`}
        </ModelsStyled>

        <SelectsStyled>
          <SelectFixInput>
            <SelectInput
              label={t(StrCode.SortBy)}
              items={sortBy}
              value={valueSort}
              setValue={setValueSort}
            />
          </SelectFixInput>

          <SelectFixSecond>
            <SelectInput
              label={t(StrCode.ItemsOnPage)}
              items={itemOnPage}
              value={valuePerPage}
              setValue={setValuePerPage}
            />
          </SelectFixSecond>
        </SelectsStyled>

        <ProductListStyled>
          {sortedAndPaginatedProducts().map(item => (
            <ProductCard
              key={item.id}
              variant='ListPage'
              product={item}
            />
          ))}
        </ProductListStyled>
      </ProductsPageStyled>
    </div>
  )
};

export default ProductsPage;
