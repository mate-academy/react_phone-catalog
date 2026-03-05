import { Github, Linkedin, Send, Mail, type LucideIcon } from 'lucide-react';

export enum SocialPlatform {
  Github = 'github',
  Linkedin = 'linkedin',
  Telegram = 'telegram',
  Email = 'email',
}

type SocialPlatformConfig = {
  key: SocialPlatform;
  label: string;
  icon: LucideIcon;
};

export const SOCIAL_PLATFORM_CONFIG: SocialPlatformConfig[] = [
  { key: SocialPlatform.Github, label: 'GitHub', icon: Github },
  { key: SocialPlatform.Linkedin, label: 'LinkedIn', icon: Linkedin },
  { key: SocialPlatform.Telegram, label: 'Telegram', icon: Send },
  { key: SocialPlatform.Email, label: 'Email', icon: Mail },
];
