import { TeamMemberCard } from './components/TeamMemberCard';

import { useState } from 'react';
import { ArrowDown } from '../../images/icons/ArrowDown';
import { ArrowUp } from '../../images/icons/ArrowUp';
import { teamMembersData } from './data/teamMembersData';
import { useLanguage } from '../../context/language/useLanguage';

export const TeamMembers = () => {
  const [isTeamVisible, setIsTeamVisible] = useState(false);

  const { currentLanguage } = useLanguage();

  const toggleVisible = () => {
    setIsTeamVisible(!isTeamVisible);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleVisible}
        className="py-3 px-3 border border-icons dark:border-dark-icons hover:border-primary dark:hover:border-purple bg-white dark:bg-dark-card-background text-primary dark:text-dark-primary transition duration-300 ease-in-out cursor-pointer"
      >
        {isTeamVisible ? <ArrowUp /> : <ArrowDown />}
      </button>

      {isTeamVisible && (
        <section className="mt-2 tablet:mt-4 bg-white dark:bg-dark-card-background text-primary dark:text-dark-primary rounded-xl shadow-md border border-elements dark:border-dark-border p-4 tablet:p-8">
          <h2 className="text-3xl font-bold mb-6 text-primary dark:text-dark-primary">
            This site was created:
          </h2>

          <div className="flex flex-col gap-8">
            {teamMembersData.map(member => (
              <TeamMemberCard
                key={member.id}
                name={member.name[currentLanguage]}
                photoUrl={member.photoUrl}
                unicornPhotoUrl={member.unicornPhotoUrl}
                role={member.role[currentLanguage]}
                strengths={member.strengths[currentLanguage]}
                quote={member.quote[currentLanguage]}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};
