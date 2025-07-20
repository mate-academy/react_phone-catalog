import type { FC } from 'react';
import style from './TeamCard.module.scss';

import type { PersonInfo } from '../../constants/teamPersonInfo.ts';

interface Props {
  person: PersonInfo;
}

export const TeamCard: FC<Props> = ({ person }) => {
  return (
    <div className={style.card}>
      <div className={style.personContainer}>
        <img
          src={person.img}
          alt={person.name}
          className={style.photo}
        />

        <h2 className={style.name}>{person.name}</h2>
      </div>
      <p className={style.role}>{person.role}</p>

      <ol className={style.descriptionList}>
        {person.description.map((item: string, index: number) => (
          <li
            key={index}
            className={style.descriptionItem}
          >
            {item}
          </li>
        ))}
      </ol>

      <div className={style.socialLinks}>
        {person.linkedin && (
          <a
            href={person.linkedin}
            className={style.socialLink}
          >
            LinkedIn
          </a>
        )}
        {person.github && (
          <a
            href={person.github}
            className={style.socialLink}
          >
            GitHub
          </a>
        )}
        {person.telegram && (
          <a
            href={person.telegram}
            className={style.socialLink}
          >
            Telegram
          </a>
        )}
      </div>
    </div>
  );
};
