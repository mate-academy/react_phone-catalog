// BreadcrumbItem.js
import { FC } from 'react';
import '../../styles/blocks/breadcrumb.scss';

type Props = {
  text: string,
  link: string,
};

const BreadcrumbItem: FC<Props> = ({ text, link }) => {
  return (
    <>
      {(text === 'Home') ? (
        <a className="breadcrumb-item__link" href={link}>
          <img src="images/icons/Home.svg" alt="Home icon" />
        </a>
      ) : (
        <a className="breadcrumb-item__link" href={link}>{text}</a>
      )}
    </>
  );
};

export default BreadcrumbItem;
