import { motion } from "framer-motion";

import male1 from "../../assets/characters/male1.png";
import female1 from "../../assets/characters/female1.png";

const AnimatedMascots = () => {
  return (
    <>
      {/* Male Mascot */}

      <motion.img
        src={male1}
        alt="Male Mascot"
        className="
        fixed
        bottom-6
        -left-8
        w-44
        xl:w-52
        2xl:w-56
        z-40
        hidden
        lg:block
        select-none
        pointer-events-none
        "
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Female Mascot */}

      <motion.img
        src={female1}
        alt="Female Mascot"
        className="
          fixed
          bottom-6
          -right-8
          w-44
          xl:w-52
          2xl:w-56
          z-40
          hidden
          lg:block
          select-none
          pointer-events-none
          "
        animate={{
          y: [0, -10, 0],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default AnimatedMascots;