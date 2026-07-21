import { motion } from "framer-motion";
import { FaRocket, FaPalette, FaCode, FaHeadset, FaCheckCircle } from "react-icons/fa";
import SectionPeep from "./SectionPeep";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    icon: FaRocket,
    title: "Fast Delivery",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: FaPalette,
    title: "Creative Design",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: FaCode,
    title: "Scalable Solutions",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: FaHeadset,
    title: "Dedicated Support",
    gradient: "from-cyan-500 to-blue-600",
  },
];

// ── Animated Stat Component ──
const AnimatedStat = ({ value, label }) => {
  // Parse number and suffix
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = parseInt(match?.[1] || "0", 10);
  const suffix = match?.[2] || "";
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  // Intersection Observer – trigger once when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current && targetNum > 0) {
          hasAnimated.current = true;
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNum]);

  // Animate count from 0 → targetNum
  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const duration = 1500; // 1.5s

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * targetNum);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(targetNum);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, targetNum]);

  return (
    <div ref={ref} className="bg-white py-8 text-center">
      <p className="text-3xl font-extrabold gradient-text">
        {count}
        {suffix}
      </p>
      <p className="text-ink-muted text-sm mt-1 font-medium">{label}</p>
    </div>
  );
};

const WhyChooseUs = () => (
  <section className="section" style={{ background: "#faf6f0" }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">

      {/* Section heading – unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex justify-center">
          <div className="relative inline-block">
            <SectionPeep
              size={175}
              className="absolute left-1/2 -translate-x-1/2 -top-[130px] z-10"
            />
            <span className="section-eyebrow relative z-20">
              Why Choose Us
            </span>
          </div>
        </div>

        <h2 className="section-title mt-5">
          Why Businesses Choose{" "}
          <span className="gradient-text">Connect2Creovox</span>
        </h2>
      </motion.div>

      {/* Feature cards – unchanged */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.04,
                transition: { duration: 0.3 },
              }}
              className={`
                group relative
                flex flex-col items-center justify-center
                rounded-2xl p-5
                h-[140px] w-full
                bg-gradient-to-br ${feature.gradient}
                backdrop-blur-md
                border border-white/20
                shadow-lg
                hover:shadow-xl
                transition-all duration-300
                overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 mb-2 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-md group-hover:rotate-8 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="relative z-10 text-white font-bold text-sm text-center tracking-tight">
                {feature.title}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* Stats strip – animated numbers from 0 to final */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-100 rounded-2xl overflow-hidden shadow-brand-sm"
      >
        {[
          { n: "200+", label: "Projects Delivered" },
          { n: "50+",  label: "Happy Clients" },
          { n: "2+",   label: "Years Experience" },
          { n: "24/7", label: "Support Available" },
        ].map((s, i) => (
          <AnimatedStat key={i} value={s.n} label={s.label} />
        ))}
      </motion.div>

    </div>
  </section>
);

export default WhyChooseUs;