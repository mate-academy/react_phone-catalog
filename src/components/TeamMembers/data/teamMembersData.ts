import tetianaPhoto from './photos/tetiana-1.jpg';
import tetianaUnicornPhoto from './photos/tetiana-3.png';
import artemPhoto from './photos/artem-1.jpg';
import artemUnicornPhoto from './photos/artem-4.png';
import bogdanPhoto from './photos/bogdan-5.jpg';
import bogdanUnicornPhoto from './photos/bogdan-4.png';
import andriyPhoto from './photos/andriy-4.jpg';
import andriyUnicornPhoto from './photos/andriy-3.png';
import nadiiaPhoto from './photos/nadiia-2.png';
import nadiiaUnicornPhoto from './photos/nadiia-1.png';

export interface TeamMember {
  id: number;
  name: {
    en: string;
    ua: string;
  };
  role: {
    en: string;
    ua: string;
  };
  photoUrl: string;
  unicornPhotoUrl: string;
  strengths: {
    en: {
      label: string;
      text: string;
    };
    ua: {
      label: string;
      text: string;
    };
  };
  quote: {
    en: string;
    ua: string;
  };
}

export const teamMembersData: TeamMember[] = [
  {
    id: 1,
    name: {
      en: `Tetiana Hodis`,
      ua: `Тетяна Годісь`,
    },
    role: {
      en: `Developer`,
      ua: `Розробник`,
    },
    photoUrl: tetianaPhoto,
    unicornPhotoUrl: tetianaUnicornPhoto,
    strengths: {
      en: {
        label: `Strengths: `,
        text: ` The team's positive energy source. She's incredibly persistent and devoted, always willing to immerse herself in the specifics of code and tasks to gain a full understanding. Her sharp analytical mind and enthusiasm genuinely motivate the entire team.`,
      },
      ua: {
        label: `Сильні сторони: `,
        text: ` Джерело позитивного настрою команди.Надзвичайно наполеглива та віддана справі, готова заглиблюватися в деталі коду та задач, прагнучи повного розуміння. Її глибокий аналітичний підхід та ентузіазм надихають усю команду. `,
      },
    },
    quote: {
      en: `Quote: 'I'm going to dream about this slider.'`,
      ua: `Цитата:'Слайдер буде мені снитися'`,
    },
  },
  {
    id: 2,
    name: {
      en: `Artem Demianovskyi`,
      ua: `Артем Дем'яновський`,
    },
    role: {
      en: `Developer`,
      ua: `Розробник`,
    },
    photoUrl: artemPhoto,
    unicornPhotoUrl: artemUnicornPhoto,
    strengths: {
      en: {
        label: `Strengths: `,
        text: ` This individual is a solid team player and a key project driver. They're always ready to give helpful advice and never shy away from difficult, ambitious tasks, ensuring their successful completion. They're deeply fascinated by the intricate internal mechanisms of systems.`,
      },
      ua: {
        label: `Сильні сторони: `,
        text: ` Сильний командний гравець та рушійна сила проекту. Активно надає корисні поради та не боїться братися за складні, амбітні завдання, доводячи їх до кінця. Має глибокий інтерес до внутрішніх механізмів роботи систем. `,
      },
    },
    quote: {
      en: `Quote: 'Styling ready-made components — that's true love.'`,
      ua: `Цитата: 'Стилізація готових компонентів - то любов.'`,
    },
  },
  {
    id: 3,
    name: {
      en: `Bohdan Bondar`,
      ua: `Богдан Бондар`,
    },
    role: {
      en: `Developer`,
      ua: `Розробник`,
    },
    photoUrl: bogdanPhoto,
    unicornPhotoUrl: bogdanUnicornPhoto,
    strengths: {
      en: {
        label: `Strengths: `,
        text: ` An exceptionally productive and imaginative idea source. He's adept at discovering unique and effective solutions for any problem. The more demanding the situation, the more he thrives.`,
      },
      ua: {
        label: `Сильні сторони: `,
        text: ` Високопродуктивний та креативний генератор ідей. Швидко знаходить нестандартні та ефективні рішення для будь-яких задач. Чим більше викликів, тим краще він себе проявляє. `,
      },
    },
    quote: {
      en: `Quote: 'I've familiarized myself with the shopping cart, but I still don't fully grasp it... it's kind of 'fifty-fifty.'`,
      ua: `Цитата: 'Проникся корзинкою, але до кінця не зрозумів, таке ... +/- '`,
    },
  },
  {
    id: 4,
    name: {
      en: `Andrii Pavlenko`,
      ua: `Андрій Павленко`,
    },
    role: {
      en: `Developer`,
      ua: `Розробник`,
    },
    photoUrl: andriyPhoto,
    unicornPhotoUrl: andriyUnicornPhoto,
    strengths: {
      en: {
        label: `Strengths: `,
        text: ` He's exceptionally thorough and perceptive, capable of detecting even the most minor bugs in code. This individual is remarkably industrious and prepared to take on significant amounts of work, without being deterred by monotonous tasks. He's consistently open to new challenges.`,
      },
      ua: {
        label: `Сильні сторони: `,
        text: ` Винятково уважний до деталей та спостережливий, здатний виявити найменші помилки в коді. Надзвичайно працелюбний та готовий до великих обсягів роботи, не лякається одноманітних завдань. Завжди готовий до нових викликів.`,
      },
    },
    quote: {
      en: `Quote: 'Setting up the Tailwind config — that's the most interesting part.'`,
      ua: `Цитата: 'Налаштування конфігу tailwind - саме цікаве'`,
    },
  },
  {
    id: 5,
    name: {
      en: `Nadiia Bryk`,
      ua: `Надія Брик`,
    },
    role: {
      en: `Developer`,
      ua: `Розробник`,
    },
    photoUrl: nadiiaPhoto,
    unicornPhotoUrl: nadiiaUnicornPhoto,
    strengths: {
      en: {
        label: `Strengths: `,
        text: ` She is responsible and organized, effectively structuring her work and seeking to optimize processes. Capable of deep focus on tasks, she also grasps the crucial role of work-life balance in preserving productivity.`,
      },
      ua: {
        label: `Сильні сторони: `,
        text: ` Відповідальна та системна. Ефективно організовує свою роботу та прагне до оптимізації процесів. Здатна зосередитися на задачі, а також розуміє важливість балансу між роботою та відпочинком для збереження продуктивності. `,
      },
    },
    quote: {
      en: `Quote: 'It's important to be able to disconnect.'`,
      ua: `Цитата: 'Потрібно вміти вимикатися'`,
    },
  },
];
