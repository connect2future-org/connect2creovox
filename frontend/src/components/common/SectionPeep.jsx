import { motion } from "framer-motion";
import femalePeep from "../../assets/characters/female_peep.png";

const SectionPeep = ({ size = 175, className = "" }) => (
  <motion.img
    src={femalePeep}
    alt="Mascot"
    style={{ width: `${size}px` }}
    className={`pointer-events-none select-none ${className}`}
    animate={{ y: [0, -5, 0] }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default SectionPeep;