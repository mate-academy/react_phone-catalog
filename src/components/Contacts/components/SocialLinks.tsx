import type { TeamMember } from '../types/teamMember';
import { SOCIAL_PLATFORM_CONFIG } from '../constants/socialPlatforms';

interface SocialLinksProps {
  member: TeamMember;
}

const isPlaceholderUrl = (url: string) => {
  return url === 'mailto:' || url.endsWith('.com/') || url.endsWith('.com/in/');
};

const isMailtoLink = (url: string) => url.startsWith('mailto:');

export const SocialLinks = ({ member }: SocialLinksProps) => {
  const handleStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="flex gap-2 pt-3 border-t border-border">
      {SOCIAL_PLATFORM_CONFIG.map(({ key, label, icon: Icon }) => {
        const url = member[key];
        if (!url || isPlaceholderUrl(url)) return null;

        const isEmail = isMailtoLink(url);

        return (
          <a
            key={key}
            href={url}
            {...(!isEmail && { target: '_blank', rel: 'noopener noreferrer' })}
            onClick={handleStopPropagation}
            aria-label={label}
            title={label}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
};
