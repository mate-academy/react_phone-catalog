/* eslint-disable max-len */
import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../titles/PageTitle';
import cl from './AboutPage.module.scss';

const textContent = {
  title: {
    en: 'About this project',
    ua: 'Про цей проєкт',
  },
  firstPart: {
    en: 'This open-source single-page application was made by me, a web developer from Ukraine ',
    ua: 'Цей відкритий односторінковий додаток був створений мною, веб-розробником з України, ',
  },
  myNameLink: {
    en: 'Maksym Mohyla',
    ua: 'Максимом Могилою,',
  },
  secondPart: {
    en: 'using the following technologies: HTML, CSS, TypeScript, React, SCSS modules, and some libraries i.e., Redux Toolkit, classnames, react-router-dom, etc. I used ',
    ua: 'з використанням таких технологій: HTML, CSS, TypeScript, React, SCSS модулів та деяких бібліотек, таких як Redux Toolkit, classnames, react-router-dom тощо. Я використав ',
  },
  figmaLink: {
    en: 'this free markup from Figma. ',
    ua: 'цей безкоштовний макет з Figma. ',
  },
  finalPart: {
    en: "This app provides a responsive interface that is intuitively understandable on phones, tablets, and desktop screens. Additionally, I used mock server requests with an internal API, developed functional components for basic online store functions: adding or removing products in your cart or favorites page (using browser local storage so data will be saved between browser sessions), filtering lists of products, routing through single-page app components, a fully working and responsive image carousel (without using any libraries for it), hover effects for interactive elements, etc. The best code practices were used: DRY (don't repeat yourself), the code is concise, clear, and there are written comments for difficult points.",
    ua: "Цей додаток забезпечує адаптивний інтерфейс, який інтуїтивно зрозумілий на телефонах, планшетах та комп'ютерних екранах. Крім того, я використовував запити до макету сервера з внутрішнім API, розробив функціональні компоненти для основних функцій інтернет-магазину: додавання або видалення продуктів у вашому кошику або на сторінці обраного (використовуючи локальне сховище браузера, щоб дані зберігалися між сеансами браузера), фільтрація списків продуктів, маршрутизація через компоненти односторінкового додатка, повністю робоча та адаптивна карусель зображень (без використання будь-яких бібліотек для цього), ефекти наведення для інтерактивних елементів тощо. Використовувалися найкращі практики кодування: DRY (не повторюй себе), код є лаконічним, зрозумілим, і є написані коментарі для складних моментів.",
  },
};

export const AboutPage = () => {
  const { language } = useAppSelector(st => st.global);

  return (
    <div className="container">
      <article>
        <PageTitle text={textContent.title[language]} />
        <p className={cl.text}>
          {textContent.firstPart[language]}{' '}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            className={cl.text__link}
            rel="noreferrer"
          >
            {textContent.myNameLink[language]}{' '}
          </a>
          {textContent.secondPart[language]}{' '}
          <a
            // eslint-disable-next-line max-len
            href="https://www.figma.com/design/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark?node-id=0-1&p=f&t=xv1Vsy2o6AHmrbRy-0"
            target="_blank"
            className={cl.text__link}
            rel="noreferrer"
          >
            {textContent.figmaLink[language]}{' '}
          </a>
          {textContent.finalPart[language]}
        </p>
      </article>
    </div>
  );
};
