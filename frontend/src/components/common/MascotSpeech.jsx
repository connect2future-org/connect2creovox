import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Need a Website?",
  "Need ERP Solutions?",
  "Need Branding?",
  "Need Marketing?",
  "Let's Build Together!",
];

const MascotSpeech = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="
        fixed
        bottom-72
        left-2
        z-50
        hidden
        lg:block
      "
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="
          relative
          bg-white
          border-2
          border-pink-400
          rounded-3xl
          shadow-2xl
          px-4
          py-2
          text-base
          font-semibold
          text-gray-800
          whitespace-nowrap
        "
      >
        {messages[index]}

        {/* Speech Bubble Tail */}
        <div
          className="
            absolute
            -bottom-2
            left-12
            w-4
            h-4
            bg-white
            border-r-2
            border-b-2
            border-pink-400
            rotate-45
          "
        />
      </div>
    </motion.div>
  );
};

export default MascotSpeech;