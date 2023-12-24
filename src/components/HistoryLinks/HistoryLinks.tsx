import { Link } from 'react-router-dom';
import cn from 'classnames';
import './HistoryLinks.scss';
import { HistoryLink } from '../../types/others/types';

type Props = {
  links: HistoryLink[];
};

export const HistoryLinks: React.FC<Props> = ({ links }) => {
  const getLinkContent = (link: HistoryLink, index: number) => {
    return (
      <>
        <img
          src="icons/arrow-right-grey.svg"
          alt="arr"
          className="HistoryLinks__link-arrow"
        />
        <p className={cn('HistoryLinks__link-title',
          { grey: links.length - 1 === index })}
        >
          {link.title}
        </p>
      </>
    );
  };

  return (
    <div data-cy="breadCrumbs" className="HistoryLinks">
      <Link className="HistoryLinks__link" to="/">
        <img
          src="icons/home.svg"
          alt="Home"
          className="HistoryLinks__home"
        />
      </Link>
      {links.map((link, index) => (
        link.link
          ? (
            <Link
              key={link.title}
              className="HistoryLinks__link"
              to={link.link}
            >
              {getLinkContent(link, index)}
            </Link>
          ) : (
            <span
              key={link.title}
              className="HistoryLinks__link"
            >
              {getLinkContent(link, index)}
            </span>
          )
      ))}
    </div>
  );
};
