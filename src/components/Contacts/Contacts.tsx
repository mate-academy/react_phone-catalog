import { useTranslation } from 'react-i18next';
import { TYPOGRAPHY } from '@/constants/typography';
import { TEAM_MEMBERS } from './constants/teamMembers';
import { useActiveCard } from './hooks/useActiveCard';
import { TeamMemberCard } from './components/TeamMemberCard';

export const Contacts = () => {
  const { t } = useTranslation();
  const { activeIndex, handleToggleCard } = useActiveCard();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className={`${TYPOGRAPHY.h1} text-foreground mb-8 text-center`}>
        {t('team.ourTeam')}
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {TEAM_MEMBERS.map((member, index) => (
          <div
            key={member.name}
            className="w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(20%-13px)]"
          >
            <TeamMemberCard
              member={member}
              isActive={index === activeIndex}
              onToggle={() => handleToggleCard(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
