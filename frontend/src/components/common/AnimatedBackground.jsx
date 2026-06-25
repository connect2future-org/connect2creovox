import { motion } from "framer-motion";
import wing from "../../assets/logo-wing.png"; // crop only the pink wing from your logo

const wings = [
  { x: "8%", y: "12%", size: 45, delay: 0 },
  { x: "26%", y: "22%", size: 65, delay: 2 },
  { x: "54%", y: "10%", size: 80, delay: 5 },
  { x: "72%", y: "38%", size: 55, delay: 3 },
  { x: "88%", y: "18%", size: 60, delay: 6 },
  { x: "60%", y: "74%", size: 75, delay: 1 },
  { x: "12%", y: "82%", size: 55, delay: 4 },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* White background */}
      <div className="absolute inset-0 bg-white" />

      {/* Soft Pink Glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle,#ff4fa822 0%,transparent 70%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[650px] h-[650px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle,#ff4fa81c 0%,transparent 70%)",
        }}
        animate={{
          x: [0, -70, 30, 0],
          y: [0, -50, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
        }}
      />

      {/* Floating Wings */}
      {wings.map((w, i) => (
        <motion.img
          key={i}
          src={wing}
          className="absolute opacity-20"
          style={{
            left: w.x,
            top: w.y,
            width: w.size,
            filter:
              "drop-shadow(0 0 18px rgba(236,72,153,.3))",
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 10,
            delay: w.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: "#ec4899",
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Bottom Mesh Wave */}
      <svg
        className="absolute bottom-0 w-full"
        height="260"
        preserveAspectRatio="none"
        viewBox="0 0 1440 260"
      >
        <path
          fill="rgba(236,72,153,.12)"
          d="M0,160 C260,60 480,240 720,140 C960,40 1180,260 1440,120 L1440,260 L0,260 Z"
        />
        <path
          fill="rgba(236,72,153,.08)"
          d="M0,120 C220,240 480,40 720,180 C960,320 1180,80 1440,180 L1440,260 L0,260 Z"
        />
      </svg>
    </div>
  );
}