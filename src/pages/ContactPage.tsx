import { motion } from 'motion/react';
import { Typography } from '../components/atoms/Typography/Typography';

type Props = {
  scale?: number;
  duration?: number;
};

export const ContactPage: React.FC<Props> = ({
  scale = 1.1,
  duration = 0.5,
}) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src="/img/the-panties/beach-pix-3.png"
            alt="Beach Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.a
            href="https://github.com/FiveEnds/Frontend"
            target="blank"
            className="absolute z-10 top-[10%] left-1/2 -translate-x-1/2 text-center"
            whileHover={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: duration, repeat: Infinity }}
          >
            <Typography level="h1">
              Developed by <br />
              <u>~ FIVE ENDS ~</u>
            </Typography>
          </motion.a>

          {/* Голова Бороди - Кентавр(отак-от) */}
          <motion.a
            href="https://github.com/haaos2009"
            target="blank"
            className="absolute z-10 block top-[25%] left-[47%] w-[8%]"
            whileHover={{
              scale: [1, scale, 1],
            }}
            transition={{ duration: duration, repeat: Infinity }}
          >
            <img
              src="/img/the-panties/boroda-l-pix.png"
              alt="boroda-developer head"
              className="w-full h-auto"
            />
          </motion.a>

          {/* Голова ТехЛіда - Сидить у кріслі(жирний) */}
          <motion.a
            href="https://github.com/VladyslavL02"
            target="blank"
            className="absolute z-10 block top-[51%] left-[27%] w-[7%]"
            whileHover={{
              scale: [1, scale, 1],
            }}
            transition={{ duration: duration, repeat: Infinity }}
          >
            <img
              src="/img/the-panties/vlad-tl-pix.png"
              alt="vlad-tl head"
              className="w-full h-auto"
            />
          </motion.a>

          {/* Голова Тимофія - Ровний тіп */}
          <motion.a
            href="https://github.com/TeoKisel"
            target="blank"
            className="absolute z-10 block top-[40%] left-[38%] w-[10%]"
            whileHover={{
              scale: [1, scale, 1],
            }}
            transition={{ duration: duration, repeat: Infinity }}
          >
            <img
              src="/img/the-panties/tymofiy-pix.png"
              alt="tymofiy head"
              className="w-full h-auto"
            />
          </motion.a>

          {/* Голова Проджект Менеджера - Качок */}
          <motion.a
            href="https://github.com/pwcupcake228-png"
            target="blank"
            className="absolute z-10 block top-[35%] left-[60%] w-[11%]"
            whileHover={{
              scale: [1, scale, 1],
            }}
            transition={{ duration: duration, repeat: Infinity }}
          >
            <img
              src="/img/the-panties/sasha-pix.png"
              alt="sasha head"
              className="w-full h-auto"
            />
          </motion.a>

          {/* Голова Влада) - Гном-перекач */}
          <motion.a
            href="https://github.com/vlad4uikov"
            target="blank"
            className="absolute z-10 block top-[53%] left-[55%] w-[7.5%]"
            whileHover={{
              scale: [1, scale, 1],
            }}
            transition={{ duration: duration, repeat: Infinity }}
          >
            <img
              src="/img/the-panties/vlad-pix.png"
              alt="vlad head"
              className="w-full h-auto"
            />
          </motion.a>
        </div>
      </div>
    </>
  );
};
