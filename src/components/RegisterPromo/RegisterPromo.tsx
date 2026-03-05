import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/Dialog';
import { PROMO_CONFIG, PROMO_TEXTS } from './types/promo-constants';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterPromoProps {
  onRegister?: () => void;
}

export const RegisterPromo = ({ onRegister }: RegisterPromoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { colors, maxWidth, timerDelay } = PROMO_CONFIG;

  useEffect(() => {
    if (userLoggedIn) return;

    const hasSeenPromo = localStorage.getItem('has_seen_register_promo');

    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('has_seen_register_promo', 'true');
      }, timerDelay);

      return () => clearTimeout(timer);
    }
  }, [userLoggedIn, timerDelay]);

  const handleRegisterClick = () => {
    navigate('/signup');
    onRegister?.();
    setIsOpen(false);
  };

  if (userLoggedIn) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent
        className={`${maxWidth} w-[95%] p-0 border-none bg-transparent shadow-none overflow-visible`}
      >
        <div
          className={`relative ${colors.paperBg} p-6 md:p-10 rounded-2xl border-[8px] md:border-[12px] ${colors.paperBorder} shadow-2xl transition-colors duration-300`}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] invert dark:invert-0" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <DialogHeader className="space-y-1">
              <h2
                className={`text-3xl md:text-4xl font-black ${colors.textPrimary} uppercase tracking-tight`}
              >
                {PROMO_TEXTS.header}
              </h2>
              <p
                className={`text-lg md:text-xl ${colors.textSecondary} font-medium`}
              >
                {PROMO_TEXTS.subHeader}
              </p>
            </DialogHeader>

            <div className="relative my-6 md:my-8">
              <div
                className={`w-36 h-36 md:w-48 md:h-48 ${colors.circleBg} rounded-full flex items-center justify-center shadow-inner relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent" />
                <div className="relative">
                  <Gift
                    className={`w-16 h-16 md:w-20 md:h-20 ${colors.accent}`}
                    strokeWidth={1.5}
                  />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white mt-1">
                    %
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 -bottom-2 md:-right-10 md:bottom-4 rotate-[-10deg] scale-60 md:scale-90">
                <div
                  className={`border-4 ${colors.stampBorder} ${colors.stampText} ${colors.stampBg} px-3 py-1 md:px-4 md:py-2 font-black text-lg md:text-xl uppercase rounded-lg shadow-lg`}
                >
                  {PROMO_TEXTS.discountBadge}
                  <div
                    className={`text-[9px] md:text-[10px] border-t ${colors.stampBorder} mt-0.5`}
                  >
                    {PROMO_TEXTS.discountSubtext}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[90%] md:max-w-[85%] space-y-5">
              <p
                className={`${colors.textSecondary} font-semibold text-xs md:text-sm leading-relaxed`}
              >
                {PROMO_TEXTS.description}
              </p>

              <Button
                className={`${colors.button} text-[#f5f5dc] w-full md:w-auto px-8 md:px-12 py-5 md:py-7 text-xl md:text-2xl font-bold rounded-xl shadow-xl transition-all hover:scale-95 duration-500 active:scale-85 uppercase tracking-wider`}
                onClick={handleRegisterClick}
              >
                {PROMO_TEXTS.buttonText}
              </Button>

              <p
                className={`text-[9px] md:text-[10px] ${colors.textSecondary} opacity-60 uppercase font-bold tracking-widest`}
              >
                {PROMO_TEXTS.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
