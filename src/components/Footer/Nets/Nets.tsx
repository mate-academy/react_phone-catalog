import './Nets.scss';
import { footerLinks } from './constants';

const Nets = () => (
  <ul className="nets">
    {footerLinks.map(({ value, href }) => (
      <li key={href} className="net">
        <a
          className="link net__link"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
      </li>
    ))}
  </ul>
);

export default Nets;
