import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Phones',
    href: '/phones',
    image: {
      src: '/images/categories/phones.webp',
      alt: 'Phones category',
      bg: '#6d6474',
    },
  },
  {
    title: 'Tablets',
    href: '/tablets',
    image: {
      src: '/images/categories/tablets.webp',
      alt: 'Tablets category',
      bg: '#8d8d92',
    },
  },
  {
    title: 'Accessories',
    href: '/accessories',
    image: {
      src: '/images/categories/accessories.webp',
      alt: 'Accessories category',
      bg: '#973d5f',
    },
  },
];

export const Categories = () => {
  return (
    <ul className="pageGrid mt-[24px]">
      {categories.map(({ title, href, image }) => (
        <li key={title} className="col-span-4 group xl:col-span-8">
          <Link to={href} className="flex flex-col">
            <div
              className={`relative overflow-hidden before:content-[""] before:block before:pb-[100%]`}
              style={{ backgroundColor: image.bg }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute origin-bottom-right object-contain transition-transform top-[10%] left-[27%] size-full object-bottom-left group-hover:scale-105"
              />
            </div>
            <h4 className="mt-[24px] text-h4 text-primary">{title}</h4>
            <p className="mt-[4px] text-body text-secondary">models</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
