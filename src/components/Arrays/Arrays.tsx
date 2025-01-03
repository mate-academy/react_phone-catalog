import { useContext, useEffect } from "react";
import './Arrays.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { last } from "../../helpers/sliceToShow";
import { CatalogContext } from "../../pages/CatalogContext";
import { ThemeVars } from "../../types/themeTypes";
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
import Arrow_Right from '../../images/homePage/Arrow_Right.svg';
import Right_banner from '../../images/homePage/Right_banner.svg';
import Vec_light_left from '../../images/homePage/Vec_light_left.svg';
import Left_banner from '../../images/homePage/Left_banner.svg';
import Vec_light_left_dark from '../../images/homePage/Vec_light_left_dark.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import Vec_light_right_dark from '../../images/homePage/Vec_light_right_dark.svg';
import { fetchAllProducts } from "../../features/allProductsSlice";

export const Arrays = () => {

  const { elOnPage, currentPage, handlePreviousPage, handleNextPage } =
    useContext(CatalogContext);

    const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    state => state.allProducts,
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
    
  }, [products]);

  const sortedBrand = [...products].sort((a, b) => b.price - a.price);

  const lastPage = last(sortedBrand, elOnPage);

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const handleImgPrev = () => {
    if (theme === ThemeVars.DARK) {
      return currentPage === 1 
        ? `${Vec_light_left_dark}` 
        : `${Left_banner}`
    } else {
      return currentPage === 1 
        ? `${Vec_light_left}` 
        : `${Arrow_Left}`
    }
  };

  const handleNextImg = () => {
    if (theme === ThemeVars.DARK) {
      return currentPage === lastPage 
        ? `${Vec_light_right_dark}` 
        : `${Right_banner}`
    } else {
      return currentPage === lastPage
        ? `${Vec_light_right}`
        : `${Arrow_Right}`
    }
  }

  const buttonClass = `arrays__button theme-${theme}`;

  return (
    <div className="arrays">
      <button
        className={`${buttonClass} arrays__left`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <img
          src={handleImgPrev()}
          className="arrays__img"
          alt={Arrow_Left}
        />
      </button>
      <button
        className={buttonClass}
        onClick={handleNextPage}
        disabled={currentPage === lastPage}
      >
        <img
          src={handleNextImg()}
          className="arrays__img"
          alt={Arrow_Right}
        />
      </button>
    </div>
  )
}