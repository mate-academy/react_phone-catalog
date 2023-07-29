// BreadcrumbItem.js
import { FC } from 'react';
import '../../styles/styles.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  text: string,
  link: string,
};

const BreadcrumbItem: FC<Props> = ({ text, link }) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {(text === '') ? (
        <NavLink className="breadcrumb-item__link" to="/">
          <img src="images/icons/Home.svg" alt="Home icon" />
        </NavLink>
      ) : (
        <>
          <NavLink className="breadcrumb-item__link" to={`${link}`}>
            <img src="images/icons/ArrowRight.svg" alt="Arrow right" />
            {capitalizeFirstLetter(text)}
          </NavLink>
        </>
      )}
    </>
  );
};

export default BreadcrumbItem;
