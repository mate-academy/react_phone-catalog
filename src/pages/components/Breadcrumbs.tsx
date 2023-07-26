// Breadcrumbs.js
import { FC } from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import '../../styles/blocks/breadcrumb.scss';

type Props = {
  items: { text: string; link: string; }[],
};

const Breadcrumbs: FC<Props> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb__breadcrumb-list">
        {items.map((item) => (
          <li
            className="breadcrumb__breadcrumb-item breadcrumb-item"
            key={item.text}
          >
            <BreadcrumbItem text={item.text} link={item.link} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
