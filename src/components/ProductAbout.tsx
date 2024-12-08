import { useAppSelector } from "../utils/hooks";

export const ProductAbout = () => {
  const { selectedProduct } = useAppSelector(state => state.selectedProduct);

  return (
    <div className="col-[1/5] mb-[56px] sm:col-[1/13] sm:mb-[64px] xl:col-[1/13] xl:mb-[80px]">
      <h2 className="product-section-title">About</h2>

      <div className="flex flex-col gap-[32px]">
        {selectedProduct?.description.map((item, index) => (
          <div key={index} className="flex flex-col gap-[16px]">
            <h2 className="description-title">{item.title}</h2>
            {item.text.map((par, ind) => (
              <p className="description-text" key={ind}>{par}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};