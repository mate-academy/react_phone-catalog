import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PasswordToggleButton = ({
  isVisible,
  onToggle,
}: PasswordToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    className="text-muted-foreground hover:text-foreground transition-colors"
  >
    {isVisible ?
      <EyeOff className="w-4 h-4" />
    : <Eye className="w-4 h-4" />}
  </button>
);
