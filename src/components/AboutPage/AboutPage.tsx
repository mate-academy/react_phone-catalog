import { PageTitle } from '../titles/PageTitle';
import cl from './AboutPage.module.scss';

export const AboutPage = () => (
  <div className="container">
    <article>
      <PageTitle text="About this project" />
      <p className={cl.text}>
        This open-source single-page application was made by me, a web developer
        from Ukraine{' '}
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          className={cl.text__link}
          rel="noreferrer"
        >
          Maksym Mohyla{' '}
        </a>
        using the following technologies: HTML, CSS, TypeScript, React, SCSS
        modules, and some libraries i.e., Redux Toolkit, classnames,
        react-router-dom, etc. I used{' '}
        <a
          // eslint-disable-next-line max-len
          href="https://www.figma.com/design/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark?node-id=0-1&p=f&t=xv1Vsy2o6AHmrbRy-0"
          target="_blank"
          className={cl.text__link}
          rel="noreferrer"
        >
          this free markup from Figma.{' '}
        </a>
        This app provides a responsive interface that is intuitively
        understandable on phones, tablets, and desktop screens. Additionally, I
        used mock server requests with an internal API, developed functional
        components for basic online store functions: adding or removing products
        in your cart or favorites page (using browser local storage so data will
        be saved between browser sessions), filtering lists of products, routing
        through single-page app components, a fully working and responsive image
        carousel (without using any libraries for it), hover effects for
        interactive elements, etc. The best code practices were used: DRY
        (don&apos;t repeat yourself), the code is concise, clear, and there are
        written comments for difficult points.
      </p>
    </article>
  </div>
);
