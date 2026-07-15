import { FaUsers, FaAward, FaRocket, FaLightbulb, FaCheckCircle, FaCertificate } from "react-icons/fa";
import { Link } from "react-router-dom";
import friends from "../assets/characters/friends.png";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/common/AnimatedBackground";

// Import logos
import iitGuwahatiLogo from "../assets/iit-guwahati-logo.png";
import connect2CreovoxLogo from "../assets/connect2creovox-logo.png";
import certificationBadge from "../assets/certification-badge.png";
import connect2FutureLogo from "../assets/connect2future-logo.png";

const values = [
  { icon: FaLightbulb, title: "Innovation", color: "from-amber-400 to-orange-500" },
  { icon: FaUsers, title: "Collaboration", color: "from-brand-500 to-pink-500" },
  { icon: FaAward, title: "Excellence", color: "from-violet-500 to-purple-500" },
  { icon: FaRocket, title: "Growth", color: "from-teal-500 to-cyan-500" },
];

const team = [
  { name: "Connect2Creovox Team",   role: "Creative-Tech Studio",      initials: "C2C" },
  { name: "Design Division",        role: "Branding & Visual Identity", initials: "DD" },
  { name: "Engineering Division",   role: "Software & Web Dev",         initials: "ED" },
  { name: "Marketing Division",     role: "Digital Growth",             initials: "MD" },
];

const About = () => (
  <div className="pt-16 relative overflow-hidden">

    {/* Animated Background */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-90 scale-110">
      <AnimatedBackground />
    </div>

    {/* Content */}
    <div className="relative z-10">

      {/* Hero */}
      <section className="pt-12 pb-8 text-center bg-transparent">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-eyebrow">About Us</span>
            <h1 className="section-title mt-3 text-ink drop-shadow-sm">
              Creative Technology<br />
              <span className="gradient-text">Studio</span>
            </h1>
            <p className="section-subtitle mx-auto mt-4 text-ink-muted drop-shadow-sm">
              Connect2Creovox blends branding, software, web development and digital innovation
              to help businesses stand out, grow and lead in their industries.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Link to="/services" className="btn btn-primary">Our Services</Link>
              <Link to="/contact"  className="btn btn-outline bg-white/80 backdrop-blur-sm border-white/50">Work With Us</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IIT Guwahati Certification */}
      <section className="py-4 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-50/90 to-purple-50/90 backdrop-blur-sm border border-pink-200/50 shadow-lg p-4 md:p-6 w-full max-w-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />

            <div className="flex items-center justify-between gap-4 mb-3">
              <img src={iitGuwahatiLogo} alt="IIT Guwahati" className="h-16 md:h-24 w-auto object-contain" />
              <img src={certificationBadge} alt="Certified Partner" className="h-16 md:h-24 w-auto object-contain" />
              <img src={connect2CreovoxLogo} alt="Connect2Creovox" className="h-16 md:h-24 w-auto object-contain" />
            </div>

            <div className="text-center border-t border-pink-200/30 pt-3 mt-1">
              <h4 className="text-base md:text-lg font-bold text-gray-900 flex items-center justify-center gap-2 flex-wrap">
                Certified / Associated with
                <span className="gradient-text">IIT Guwahati</span>
                <FaCheckCircle className="text-green-500 text-sm" />
              </h4>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                Code: <span className="font-mono font-semibold text-pink-600">IITGCS/24091634</span>
                <span className="inline-block ml-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-0.5 border border-white/50 shadow-sm text-xs font-medium text-gray-700">
                  🏅 Official Recognition
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

{/* ─── "a venture of" – compact, minimal whitespace, larger logo ─── */}
<section className="py-2 bg-white/50 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-center">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full max-w-xs flex flex-col items-center justify-center bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-sm border border-pink-200/40 rounded-2xl py-1 px-4 shadow-sm"
    >
      <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-pink-600 leading-none">
        a venture of
      </p>
      <img
        src={connect2FutureLogo}
        alt="Connect2Future"
        className="h-24 md:h-32 w-auto object-contain"
      />
    </motion.div>
  </div>
</section>

      {/* ─── What Drives Us – REDUCED CARD SIZES ─── */}
      <section className="py-10 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <motion.div
              className="flex justify-center mb-2"
              whileHover={{ rotate: [-4, 4, -3, 3, 0], scale: 1.08 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img src={friends} alt="Friends" className="w-48 select-none cursor-pointer" draggable={false} />
            </motion.div>
            <span className="section-eyebrow">Our Values</span>
            <h2 className="section-title mt-2 text-ink drop-shadow-sm">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    scale: 1.04,
                    transition: { duration: 0.3 },
                  }}
                  className={`
                    group relative
                    flex flex-col items-center justify-center
                    rounded-2xl p-5
                    h-40 w-full
                    bg-gradient-to-br ${feature.color}
                    backdrop-blur-md
                    border border-white/20
                    shadow-md
                    hover:shadow-xl
                    transition-all duration-300
                    overflow-hidden
                  `}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Icon with translucent circle – slightly smaller */}
                  <div className="relative z-10 mb-2 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-md group-hover:rotate-8 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title – slightly smaller */}
                  <h3 className="relative z-10 text-white font-bold text-base text-center tracking-tight">
                    {feature.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-10 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <span className="section-eyebrow">Our Story</span>
              <h2 className="section-title mt-3 text-ink">Building Digital Futures Since Day One</h2>
              <p className="text-ink-muted mt-4 leading-relaxed">
                Connect2Creovox was founded with a single mission: to give businesses of all sizes
                access to world-class branding, technology and marketing under one roof. We believe
                every great business deserves a great digital presence.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "End-to-end creative and tech solutions",
                  "Pan-India vehicle & outdoor advertising",
                  "Custom ERP, CRM & mobile applications",
                  "Performance-driven digital marketing"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-muted">
                    <FaCheckCircle className="text-brand-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {team.map((t, i) => (
                <div key={i} className="card p-6 text-center backdrop-blur-sm bg-white/90">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-400 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {t.initials}
                  </div>
                  <p className="font-bold text-ink text-sm">{t.name}</p>
                  <p className="text-ink-muted text-xs mt-1">{t.role}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default About;