import { useState, useEffect } from 'react';
import { GoBackButton } from '../../components/GoBackButton';
import { TeamCard } from '../../components/TeamCard';
import type { PersonInfo } from '../../constants/teamPersonInfo';
import style from './ContactsPage.module.scss';

export const ContactsPage = () => {
  const [teamPersonInfo, setTeamPersonInfo] = useState<PersonInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/teamPersonInfo.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PersonInfo[] = await response.json();
        setTeamPersonInfo(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <div className={style.contactsPage}>Loading...</div>;
  }

  if (error) {
    return <div className={style.contactsPage}>Loading error: {error}</div>;
  }

  return (
    <div className={style.contactsPage}>
      <GoBackButton />

      <h1 className={style.pageTitle}>
        Meet the team behind the Nice Gadgets store!
      </h1>

      <p className={style.pageInfo}>
        We are JS Ninjas team, and here is some information about us if you are
        interested or want to contact.
      </p>

      <div className={style.teamGrid}>
        {teamPersonInfo.map((person) => (
          <TeamCard
            key={person.id}
            person={person}
          />
        ))}
      </div>
    </div>
  );
};
