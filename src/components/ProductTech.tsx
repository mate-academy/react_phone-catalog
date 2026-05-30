import { useAppSelector } from '../utils/hooks';

export const ProductTech = () => {
  const { selectedProduct } = useAppSelector(state => state.selectedProduct);

  return (
    <div
      className="
        col-[1/5]
        mb-[56px]
        sm:col-[1/13]
        sm:mb-[64px]
        xl:col-[14/25]
        xl:mb-0
      "
    >
      <h2 className="product-section-title">Tech specs</h2>

      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <p className="description-text">Screen</p>
          <p className="description-text text-primary">
            {selectedProduct?.screen}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">Resolution</p>
          <p className="description-text text-primary">
            {selectedProduct?.resolution}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">Processor</p>
          <p className="description-text text-primary">
            {selectedProduct?.processor}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">RAM</p>
          <p className="description-text text-primary">
            {selectedProduct?.ram}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">Built in memory</p>
          <p className="description-text text-primary">
            {selectedProduct?.capacity}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">Camera</p>
          <p className="description-text text-primary">
            {selectedProduct?.camera}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">Zoom</p>
          <p className="description-text text-primary">
            {selectedProduct?.zoom}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="description-text">Cell</p>
          <p className="description-text text-primary">
            {selectedProduct?.cell.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};
