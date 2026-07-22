import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaBullhorn,
  FaCloud,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";
import friends from "../../assets/characters/friends.png";

const AuthBrandPanel = ({
  title,
  subtitle,
  listItems = [],
  gradient = "linear-gradient(135deg,#ec4899 0%,#db2777 50%,#be185d 100%)",
  mascotBottom = -192, // default: -192px (matches -bottom-48)
}) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedTitle(title.slice(0, index + 1));
      index++;
      if (index === title.length) {
        clearInterval(interval);
        setTimeout(() => setShowSubtitle(true), 300);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [title]);

  const floatingIcons = [
    { Icon: FaCode, x: "10%", y: "20%", delay: 0 },
    { Icon: FaMobileAlt, x: "80%", y: "15%", delay: 0.5 },
    { Icon: FaPaintBrush, x: "5%", y: "60%", delay: 1 },
    { Icon: FaBullhorn, x: "85%", y: "70%", delay: 1.5 },
    { Icon: FaCloud, x: "70%", y: "40%", delay: 2 },
    { Icon: FaRobot, x: "20%", y: "80%", delay: 0.8 },
    { Icon: FaChartLine, x: "90%", y: "50%", delay: 1.2 },
  ];

  return (
    <div
      className="hidden lg:flex flex-col justify-center px-12 xl:px-20 relative overflow-visible"
      style={{ background: gradient }}
    >
      {/* Background layers – unchanged */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none blur-2xl" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Glass cards */}
      <div className="absolute top-12 left-8 w-40 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rotate-[-8deg] pointer-events-none shadow-xl" />
      <div className="absolute bottom-12 right-8 w-48 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rotate-[12deg] pointer-events-none shadow-xl" />
      <div className="absolute top-1/3 right-12 w-32 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg rotate-[6deg] pointer-events-none shadow-lg" />
      <div className="absolute bottom-1/3 left-12 w-36 h-28 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rotate-[-5deg] pointer-events-none shadow-lg" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 text-4xl pointer-events-none"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
          transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 pb-32">
        <h1 className="text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-tight relative">
          {displayedTitle || " "}
          <span className="absolute -inset-2 bg-white/10 blur-2xl rounded-full -z-10" />
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={showSubtitle ? { width: "4rem" } : { width: 0 }}
          transition={{ duration: 0.6 }}
          className="h-1 bg-gradient-to-r from-white/80 to-white/0 rounded-full mb-5"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/90 text-xl leading-relaxed mb-6">{subtitle}</p>
        </motion.div>

        {listItems.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={showSubtitle ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            {listItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        )}

        {/* ─── Mascot – configurable bottom position ─── */}
        <motion.div
          className="absolute right-0 w-48 md:w-56 lg:w-64 pointer-events-none"
          style={{ bottom: `${mascotBottom}px` }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={friends}
            alt="Connect2Creovox Mascot"
            className="w-full h-auto drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthBrandPanel;