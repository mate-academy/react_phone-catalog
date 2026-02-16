import { useState } from 'react';

type Props = {
  name: string;
  photoUrl: string;
  unicornPhotoUrl: string;
  role: string;
  strengths: {
    label: string;
    text: string;
  };
  quote: string;
};

export const TeamMemberCard = ({
  name,
  photoUrl,
  unicornPhotoUrl,
  role,
  strengths,
  quote,
}: Props) => {
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  const handleImageClick = () => {
    setShowRealPhoto(!showRealPhoto);
  };

  return (
    <article className="team-member-card p-6 tablet:p-8 rounded-xl shadow border border-elements dark:border-dark-border bg-white dark:bg-dark-card-background text-primary dark:text-white flex flex-col gap-4">
      <h3 className="name font-mont font-extrabold text-2xl tablet:text-3xl mb-2 text-primary dark:text-dark-primary leading-tight">
        {name}
      </h3>

      <div className="content flex flex-col tablet:flex-row gap-6 desktop:gap-8 desktop:items-start desktop:justify-start">
        <div
          className="photo-container cursor-pointer w-32 h-48 bg-sky-400 dark:bg-dark-slider-button mx-auto tablet:mx-0 mb-4 rounded-full overflow-hidden md:w-45 md:h-64 lg:w-50 lg:h-70 flex-shrink-0 border-2 border-elements dark:border-dark-border"
          onClick={handleImageClick}
        >
          <img
            src={showRealPhoto ? photoUrl : unicornPhotoUrl}
            alt={showRealPhoto ? `Фото ${name}` : `Єдиноріг, схожий на ${name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="description desktop:ml-4 text-center tablet:text-left flex flex-col gap-2 tablet:gap-4 desktop:gap-6 tablet:flex-grow tablet:max-w-md tablet:min-w-0 tablet:w-auto">
          <h4 className="role font-mont font-extrabold text-xl tablet:text-2xl mb-2 text-primary dark:text-dark-primary leading-tight">
            {role}
          </h4>
          <div className="strengths text-dark-secondary dark:text-dark-secondary">
            <p className="text-primary dark:text-white/60">
              <strong className="text-primary dark:text-white/80">
                {strengths.label}
              </strong>
              {strengths.text}
            </p>
          </div>

          <blockquote className="quote mt-2 text-white/80 dark:text-white/60 italic">
            <strong className="text-primary dark:text-white/60">{quote}</strong>
          </blockquote>
        </div>
      </div>
    </article>
  );
};
