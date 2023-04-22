import './Nets.scss';

const links = [
  { value: 'github', href: '/git' },
  { value: 'contacts', href: '/conc' },
  { value: 'rights', href: '/rig' },
];

const Nets = () => (
  <ul className="nets">
    {links.map(({ value, href }) => (
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
