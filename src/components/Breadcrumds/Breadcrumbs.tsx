import { NavLink } from "react-router-dom";
import './Breadcrumbs.scss';
import { useAppSelector } from "../../app/hooks";
import Home from '../../images/Home.svg';
import Home_dark from '../../images/Home_dark.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import Vec_light_right_dark from '../../images/homePage/Vec_light_right_dark.svg';
import { ThemeVars } from "../../types/themeTypes";

type Props = {
  title: string;
  paths?: string;
  details?: boolean;
}

export const Breadcrumbs: React.FC<Props> = ({ 
  title, 
  paths, 
  details 
}) => {

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const homeImg = theme === ThemeVars.DARK ? Home_dark : Home;
  const vectorRight = theme === ThemeVars.DARK 
    ? Vec_light_right_dark 
    : Vec_light_right;
  const productsTitle = `productsPage__phones
    productsPage__phones--theme-${theme}`;
  const pathClass = `breadcrumbs__pathsLink 
    breadcrumbs__pathsLink--themeDetails-${theme}`;
  const breadCrumbsPaths = `breadcrumbs__paths theme-${theme}`;
  
  return (
    <div className="breadcrumbs">
      <NavLink to="/" className="breadcrumbs__home-link">
        <img src={homeImg} alt="home" className="breadcrumbs__home" />
      </NavLink>
      <img
        src={vectorRight}
        alt="Vector_light_right"
        className="breadcrumbs__arrow-right"
      />
      {!!details && (
        <>
        <NavLink to={`/${paths}`} className={pathClass}>
        <div className={breadCrumbsPaths}>
          {paths}
        </div>
      </NavLink>
      <img
        src={vectorRight}
        alt="Vector_light_right"
        className="breadcrumbs__arrow-right"
      />
      </>
      )}
      <div className={productsTitle}>{title}</div>
    </div>
  )
}