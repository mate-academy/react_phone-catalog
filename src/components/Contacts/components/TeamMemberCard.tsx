import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { ArrowRight, X } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import type { TeamMember } from '../types/teamMember';
import { SocialLinks } from './SocialLinks';

interface TeamMemberCardProps {
  member: TeamMember;
  isActive: boolean;
  onToggle: () => void;
}

export const TeamMemberCard = ({
  member,
  isActive,
  onToggle,
}: TeamMemberCardProps) => {
  const { t } = useTranslation();

  const handleToggleWithStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle();
  };

  const description = t(member.descriptionKey, {
    defaultValue: t('team.defaultDescription', {
      defaultValue:
        'A passionate team member dedicated to delivering high-quality solutions.',
    }),
  });

  return (
    <div
      className={cn(
        'relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl shadow-lg',
        'border border-white/10 transition-all duration-500',
        'hover:shadow-xl hover:-translate-y-1',
        isActive && 'ring-2 ring-white/20',
      )}
      onClick={onToggle}
    >
      <img
        src={member.photo}
        alt={member.name}
        className={cn(
          'absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500',
          isActive ? 'scale-110 blur-sm opacity-60' : 'scale-100 opacity-100',
        )}
      />

      <button
        onClick={handleToggleWithStopPropagation}
        aria-label={`View ${member.name}'s profile`}
        className={cn(
          'absolute top-4 right-4 z-30 p-2',
          'text-foreground bg-background/30 hover:bg-background/50',
          'backdrop-blur-md rounded-full',
          'transition-all duration-300 border border-border/30',
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 p-5 z-10',
          'bg-gradient-to-t from-background/80 to-transparent',
          'transition-opacity duration-300',
          isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
      >
        <h3 className={`${TYPOGRAPHY.h2} text-foreground`}>{member.name}</h3>
        <p className={`${TYPOGRAPHY.body} text-muted-foreground`}>
          {member.position}
        </p>
      </div>

      <div
        className={cn(
          'absolute inset-0 flex flex-col p-5 z-20 overflow-y-auto',
          'bg-card text-card-foreground',
          'transition-all duration-500 ease-in-out',
          isActive ?
            'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0 pointer-events-none',
        )}
      >
        <div className="flex justify-between items-start shrink-0">
          <img
            src={member.photo}
            alt={member.name}
            className="w-10 h-10 rounded-full object-cover object-top shrink-0"
          />
          <button
            onClick={handleToggleWithStopPropagation}
            aria-label="Close"
            className="p-1.5 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-full transition-colors z-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3">
          <h3 className={`${TYPOGRAPHY.h2} text-card-foreground leading-tight`}>
            {member.name}
          </h3>
          <p className={`${TYPOGRAPHY.body} text-muted-foreground mb-3`}>
            {member.position}
          </p>
          <p
            className={`${TYPOGRAPHY.body} text-card-foreground/80 leading-relaxed`}
          >
            {description}
          </p>
        </div>

        <div className="mt-auto shrink-0">
          <SocialLinks member={member} />
        </div>
      </div>
    </div>
  );
};
