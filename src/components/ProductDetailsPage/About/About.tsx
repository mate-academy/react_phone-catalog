import './About.scss';

type AboutProps = {
  description: { title: string; text: string[] }[];
};

export const About = ({ description }: AboutProps) => (
  <article className="about">
    <h2 className="about__title">About</h2>
    <ul className="about__description">
      {description.map(({ title, text: textArray }) => (
        <li key={title}>
          <h3 className="about__description-title">{title}</h3>
          <div className="about__description-text-container">
            {textArray.map(text => (
              <p key={text} className="about__description-text">{text}</p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  </article>
);
