import type React from 'react';
import type { Author } from '../../types/author/author';
import './AuthorCard.scss';
import { useThemeState } from '../../stateManagers/themeState';
import { useTranslationState } from '../../stateManagers/languageState';

interface AuthorCardProps {
  author: Author;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const { theme } = useThemeState();
  const { translate } = useTranslationState();

  return (
    <article className="author">
      <div className="author__inner">
        <div className="author__front">
          <img
            className="author__photo"
            src={author.photo}
            alt={`photo ${author.name}`}
          />
        </div>
        <div className={`author__back author__back--${theme}`}>
          <h3>{translate(author.name)}</h3>
          <span className="author__role body-text">{author.role}</span>
          <p className="author__info body-text">{translate(author.info)}</p>
          <a
            className="author__link "
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
};
