import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';

export const PagePath = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const path = pathname.slice(1);
  const firstSymbol = path.charAt(0).toUpperCase();

  const { selectedProduct } = useAppSelector(state => state.selectedProduct);

  const rightPath = selectedProduct
    ? selectedProduct.category.charAt(0).toUpperCase() +
      selectedProduct.category.slice(1)
    : null;

  return (
    <div
      className="
        col-[1/5] 
        my-[24px] 
        flex 
        flex-row 
        items-center 
        gap-[8px] 
        sm:col-[1/13] 
        sm:mx-[8px] 
        sm:mb-[40px]
        xl:col-[1/25]
        xl:mx-0
      "
    >
      <Link to="/">
        <img src="./img/icons/Home.svg" alt="HomeLogo" className="icons" />
      </Link>

      <img
        src="./img/icons/Arrow_Right.svg"
        alt="ArrowRigth"
        className="icons"
      />

      {productId ? (
        <Link
          to={`${selectedProduct?.category ? `/${selectedProduct.category}` : pathname}`}
        >
          <p
            className="
                font-mont-semi 
                text-[12px] 
                leading-[15.34px] 
                text-secondary 
                transition-all 
                duration-300 
                ease-in-out 
                hover:text-primary
              "
          >
            {selectedProduct ? rightPath : firstSymbol + path.slice(1)}
          </p>
        </Link>
      ) : (
        <p className="font-mont-semi text-[12px] leading-[15.34px] text-secondary">
          {firstSymbol + path.slice(1)}
        </p>
      )}

      {productId && (
        <div className="flex items-center gap-[8px]">
          <img
            src="./img/icons/Arrow_Right.svg"
            alt="ArrowRigth"
            className="icons"
          />

          <p className="params-text text-secondary">{selectedProduct?.name}</p>
        </div>
      )}
    </div>
  );
};
