import { HotPrices } from '../../../modules/HomePage/HotPrices';
import { Direction } from '../../../shared/Direction/Direction';
import { Action } from '../../../types/Action';
import { ProductDemo } from '../../../types/ProductDemo';
import { ProductFullInfo } from '../../../types/ProductFullInfo';
import { ConfirmOrder } from './ConfirmOrder/ConfirmOrder';
import { DescriptionAndSpecifications } from './DescriptionAndSpecifications';
import styles from './DetailsContent.module.scss';
import { ProductPreview } from './ProductPreview';
import { ProductSelectors } from './ProductSelectors';

type DetailsContentProps = {
  chosedItem: ProductFullInfo | undefined;
  chosedItemDemo: ProductDemo | undefined;
  isTablet: boolean;
  selectedImage: string | null;
  setSelectedImage: (val: string | null) => void;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  selectedCapacity: string;
  setSelectedCapacity: (val: string) => void;
  activeAdd: boolean;
  setActiveAdd: (val: boolean) => void;
  activeHeart: boolean;
  setActiveHeart: (val: boolean) => void;
  updateList: (item: ProductDemo, direction: Action) => void;
  suggestedList: ProductDemo[];
};

export const DetailsContent: React.FC<DetailsContentProps> = ({
  chosedItem,
  selectedImage,
  setSelectedImage,
  selectedColor,
  setSelectedColor,
  selectedCapacity,
  setSelectedCapacity,
  activeAdd,
  setActiveAdd,
  activeHeart,
  setActiveHeart,
  chosedItemDemo,
  updateList,
  suggestedList,
  isTablet,
}) => {
  if (!chosedItem) {
    return <div></div>;
  }

  return isTablet ? (
    <div className={styles.wrapper}>
      <div className={styles.tablet_content}>
        <Direction page="productID" product={chosedItem} />
        <h2 className={styles.name}>{chosedItem?.name}</h2>
        <div className={styles.tablet_order}>
          <ProductPreview
            images={chosedItem.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <div className={styles.tablet_confirm}>
            <ProductSelectors
              chosedItem={chosedItem}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedCapacity={selectedCapacity}
              setSelectedCapacity={setSelectedCapacity}
            />
            <ConfirmOrder
              chosedItem={chosedItem}
              chosedItemDemo={chosedItemDemo}
              activeAdd={activeAdd}
              setActiveAdd={setActiveAdd}
              activeHeart={activeHeart}
              setActiveHeart={setActiveHeart}
              updateList={updateList}
            />
          </div>
        </div>
        <DescriptionAndSpecifications chosedItem={chosedItem} />
        <div className={styles.also}>
          <HotPrices suggestedData={suggestedList} productDetails={true} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.content}>
      <Direction page="productID" product={chosedItem} />
      <h2 className={styles.name}>{chosedItem?.name}</h2>
      {/* preview */}
      <ProductPreview
        images={chosedItem.images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      {/* Order */}
      <ProductSelectors
        chosedItem={chosedItem}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedCapacity={selectedCapacity}
        setSelectedCapacity={setSelectedCapacity}
      />
      {/* Confirm order */}
      <ConfirmOrder
        chosedItem={chosedItem}
        chosedItemDemo={chosedItemDemo}
        activeAdd={activeAdd}
        setActiveAdd={setActiveAdd}
        activeHeart={activeHeart}
        setActiveHeart={setActiveHeart}
        updateList={updateList}
      />
      <DescriptionAndSpecifications chosedItem={chosedItem} />

      <div className={styles.also}>
        <HotPrices suggestedData={suggestedList} productDetails={true} />
      </div>
    </div>
  );
};
