import { Link } from 'react-router-dom';
import cn from 'classnames';
import './HistoryLinks.scss';

type Props = {
  links: HistoryLinkType[];
};

export const HistoryLinks: React.FC<Props> = ({ links }) => {
  return (
    <div className="HistoryLinks">
      <Link className="HistoryLinks__link" to="/">
        <img
          src="icons/home.svg"
          alt="Home"
          className="HistoryLinks__home"
        />
      </Link>
      {links.map((link, index) => (
        <Link
          key={link.title}
          className="HistoryLinks__link"
          to={link.link}
        >
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
        </Link>
      ))}
    </div>
  );
};
