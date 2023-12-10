import { HeroContent } from '../../types/HeroContent';

interface Props {
  content: HeroContent;
}

export const Hero: React.FC<Props> = ({ content }) => (
  <section className="section hero">
    <div className="section__container">
      <h1 className="h1 hero__title">{content.title}</h1>
      <div className="text hero__text">{`${content.modelsNumber} models`}</div>
    </div>
  </section>
);
