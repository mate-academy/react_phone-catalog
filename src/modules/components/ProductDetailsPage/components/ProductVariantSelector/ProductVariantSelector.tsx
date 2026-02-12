import React, { useContext } from 'react';
import './ProductVariantSelector.scss';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentColors } from '../../../../shared/servises/createVar';
import type { ProductDetails } from '../../../../shared/types/ProductDetails';
import phonesData from '../../../../../../public/api/phones.json';
import tabletsData from '../../../../../../public/api/tablets.json';
import accessoriesData from '../../../../../../public/api/accessories.json';
import { SelectedProductDispatch } from '../../../../shared/reducer/SelectedProductReducer';

type ProductVariantSelectorProps = {
  content: {
    product: ProductDetails;
    title: string;
    options: string[];
    currentOption: string;
    btnStyle: 'round' | 'regular';
    optionType: 'color' | 'capacity';
  };
};

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  content,
}) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const selectedProductDispatch = useContext(SelectedProductDispatch);
  const { title, options, currentOption, btnStyle, optionType } = content;

  const styleIsRound: boolean = btnStyle === 'round';
  const colors = getCurrentColors(category);

  const getNewOption = (
    productDetails: ProductDetails[],
    requestedOption: string,
  ) => {
    const currentTypeOfProduct = productDetails.filter(
      item => item.namespaceId === content.product.namespaceId,
    );
    let productChanged: ProductDetails = content.product;

    if (optionType === 'color') {
      productChanged = currentTypeOfProduct.filter(
        item => item.color === requestedOption,
      )[0];

      selectedProductDispatch({ type: 'setProduct', payload: productChanged });
    }

    if (optionType === 'capacity') {
      productChanged = currentTypeOfProduct.filter(
        item => item.capacity === requestedOption,
      )[0];

      selectedProductDispatch({ type: 'setProduct', payload: productChanged });
    }

    if (!productChanged) {
      return content.product;
    }

    return productChanged;
  };

  const handleChangeProductOptions = (option: string) => {
    let newProduct: ProductDetails = content.product;

    switch (category) {
      case 'phones':
        newProduct = getNewOption(phonesData, option);
        break;

      case 'tablets':
        newProduct = getNewOption(tabletsData, option);
        break;

      case 'accessories':
        newProduct = getNewOption(accessoriesData, option);
        break;

      default:
        return newProduct;
    }

    const newPath = `/${category}/${newProduct.id}`;

    navigate(newPath, { replace: true });

    return newProduct;
  };

  return (
    <section className="select-section">
      <span className="select-section__title">{title}</span>
      <div className="select-section__btn-list">
        {options.map(option => (
          <button
            key={option}
            className={classNames('select-section__btn', {
              'select-section__btn--round': styleIsRound,
              'select-section__btn--regular': !styleIsRound,
              'select-section__btn--active-round': currentOption === option,
              'select-section__btn--active-regular':
                !styleIsRound && currentOption === option,
            })}
            onClick={() => handleChangeProductOptions(option)}
          >
            {styleIsRound ? (
              <div
                className={classNames('selection-section__btn__bg', {
                  'selection-section__btn__bg--white': option === 'white',
                })}
                style={{
                  backgroundColor: colors[option],
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                }}
              ></div>
            ) : (
              <div className="selection-section__btn__option-text">
                {option}
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
