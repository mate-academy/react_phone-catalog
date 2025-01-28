/* eslint-disable max-len */
import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../titles/PageTitle';
import cl from './AboutPage.module.scss';

const textContent = {
  title: {
    en: 'About this project',
    ua: 'Про цей проєкт',
  },
  introduction: {
    en: 'This open-source single-page application was developed by ',
    ua: 'Цей відкритий односторінковий додаток був створений ',
  },
  myNameLink: {
    en: 'Maksym Mohyla',
    ua: 'Максимом Могилою',
  },
  developerFrom: {
    en: ', a web developer from Ukraine.',
    ua: ', веб-розробником з України.',
  },
  appProvides: {
    en: "The app provides a responsive interface that is intuitively understandable on phones, tablets, and desktop screens. It is a mock-up of a fictional online store for mobile electronics called 'Nice Gadgets,' designed to emulate the experience of using real online stores.",
    ua: "Додаток забезпечує адаптивний інтерфейс, який інтуїтивно зрозумілий на телефонах, планшетах та комп'ютерних екранах. Він представляє собою макет вигаданого інтернет магазину мобільної електроніки 'Nice Gadgets', який нагадує досвід користування справжніми онлайн магазинами.",
  },
  technologiesTitle: {
    en: 'Technologies Used',
    ua: 'Використані технології',
  },
  technologiesList: {
    en: [
      'HTML',
      'CSS',
      'TypeScript',
      'React',
      'SCSS modules',
      'Libraries: Redux Toolkit, classnames, react-router-dom, etc.',
      'Free markup from Figma.',
    ],
    ua: [
      'HTML',
      'CSS',
      'TypeScript',
      'React',
      'SCSS модулі',
      'Бібліотеки: Redux Toolkit, classnames, react-router-dom тощо.',
      'Безкоштовний макет з Figma.',
    ],
  },
  featuresTitle: {
    en: 'Features',
    ua: 'Функціонал',
  },
  featuresList: {
    en: [
      'Mock server requests with internal API.',
      'Functional components for basic online store functions.',
      'Adding/removing products in cart or favorites (using browser local storage).',
      'Filtering lists of products.',
      'Routing through single-page app components.',
      'Responsive image carousel (without using any libraries).',
      'Hover effects for interactive elements.',
      'Added Ukrainian language support.',
    ],
    ua: [
      'Запити до макету сервера з внутрішнім API.',
      'Функціональні компоненти для основних функцій інтернет-магазину.',
      'Додавання/видалення продуктів у кошику або в обраному (використовуючи локальне сховище браузера).',
      'Фільтрація списків продуктів.',
      'Маршрутизація через компоненти односторінкового додатка.',
      'Адаптивна карусель зображень (без використання бібліотек).',
      'Ефекти наведення для інтерактивних елементів.',
      'Додано підтримку української мови.',
    ],
  },
  methodologyTitle: {
    en: 'Development Methodology',
    ua: 'Методологія розробки',
  },
  methodologyList: {
    en: [
      "Followed best coding practices such as DRY (Don't Repeat Yourself).",
      'Code is concise, clear, with comments for difficult points.',
      'Interface divided into separate components that can be flexibly reused.',
      'TypeScript made development simpler and more predictable with static type-checking.',
    ],
    ua: [
      'Слідував найкращим практикам кодування, таким як DRY (не повторюй себе).',
      'Код лаконічний, зрозумілий, з коментарями для складних моментів.',
      'Інтерфейс розбито на окремі компоненти, які можна гнучко перевикористовувати.',
      'TypeScript зробив розробку простішою та передбачуванішою завдяки статичній типізації.',
    ],
  },
  figmaLinkText: {
    en: 'Free markup from Figma.',
    ua: 'Безкоштовний макет з Figma.',
  },
};

export const AboutPage = () => {
  const { language } = useAppSelector(st => st.global);

  return (
    <div className="container">
      <article className={cl.article}>
        <PageTitle text={textContent.title[language]} />

        <section className={cl.partOfTextSection}>
          <p className={cl.text}>
            {textContent.introduction[language]}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={cl.text__link}
              rel="noreferrer"
            >
              {textContent.myNameLink[language]}
            </a>
            {textContent.developerFrom[language]}
          </p>
          <p className={cl.text}>{textContent.appProvides[language]}</p>
        </section>

        <section className={cl.partOfTextSection}>
          <h2 className={cl.subtitle}>
            {textContent.technologiesTitle[language]}
          </h2>
          <ul className={cl.list}>
            {textContent.technologiesList[language].map((item, index) => (
              <li key={index} className={cl.listItem}>
                {item.includes('Figma') ? (
                  <a
                    href="https://www.figma.com/design/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark?node-id=0-1&p=f&t=xv1Vsy2o6AHmrbRy-0"
                    target="_blank"
                    className={cl.text__link}
                    rel="noreferrer"
                  >
                    {`- ${textContent.figmaLinkText[language]}`}
                  </a>
                ) : (
                  `- ${item}`
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={cl.partOfTextSection}>
          <h2 className={cl.subtitle}>{textContent.featuresTitle[language]}</h2>
          <ul className={cl.list}>
            {textContent.featuresList[language].map((item, index) => (
              <li key={index} className={cl.listItem}>
                {`- ${item}`}
              </li>
            ))}
          </ul>
        </section>

        <section className={cl.partOfTextSection}>
          <h2 className={cl.subtitle}>
            {textContent.methodologyTitle[language]}
          </h2>
          <ul className={cl.list}>
            {textContent.methodologyList[language].map((item, index) => (
              <li key={index} className={cl.listItem}>
                {`- ${item}`}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};
