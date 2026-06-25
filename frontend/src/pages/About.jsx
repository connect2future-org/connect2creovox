import { FaUsers, FaAward, FaRocket, FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import friends from "../assets/characters/friends.png";
import { motion, useMotionValue, useTransform } from "framer-motion";

const values = [
  { icon: <FaLightbulb />, title: "Innovation",     desc: "We create future-ready digital experiences that evolve with your business.",  color: "from-amber-400 to-orange-400" },
  { icon: <FaUsers />,     title: "Collaboration",  desc: "We work closely with every client — your goals become our goals.",              color: "from-brand-500 to-pink-400" },
  { icon: <FaAward />,     title: "Excellence",     desc: "Quality is embedded in every pixel, line of code, and design decision.",       color: "from-violet-500 to-purple-400" },
  { icon: <FaRocket />,    title: "Growth",         desc: "We focus on measurable business impact that delivers real ROI.",               color: "from-teal-500 to-cyan-400" },
];

const team = [
  { name: "Connect2Creovox Team",   role: "Creative-Tech Studio",      initials: "C2C" },
  { name: "Design Division",        role: "Branding & Visual Identity", initials: "DD" },
  { name: "Engineering Division",   role: "Software & Web Dev",         initials: "ED" },
  { name: "Marketing Division",     role: "Digital Growth",             initials: "MD" },
];

const About = () => (
  <div className="pt-20">

    {/* Hero */}
    <section className="hero-bg pt-32 pb-16 text-center">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="section-eyebrow">About Us</span>
          <h1 className="section-title mt-3">
            Creative Technology<br />
            <span className="gradient-text">Studio</span>
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            Connect2Creovox blends branding, software, web development and digital innovation
            to help businesses stand out, grow and lead in their industries.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/services" className="btn btn-primary">Our Services</Link>
            <Link to="/contact"  className="btn btn-outline">Work With Us</Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">

        {/* Friends Mascot */}
        <motion.div
          className="flex justify-center mb-3"
          whileHover={{
            rotate: [-4, 4, -3, 3, 0],
            scale: 1.08,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <img
            src={friends}
            alt="Friends"
            className="w-64 select-none cursor-pointer"
            draggable={false}
          />
        </motion.div>

        <span className="section-eyebrow">
          Our Values
        </span>

        <h2 className="section-title mt-3">
          What Drives Us
        </h2>

      </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="card p-8 text-center"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} text-white text-2xl flex items-center justify-center mx-auto mb-5 shadow-md`}>
                {v.icon}
              </div>
              <h3 className="font-bold text-ink text-lg mb-2">{v.title}</h3>
              <p  className="text-ink-muted text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Story */}
    <section className="py-16" style={{ background: "#faf6f0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <span className="section-eyebrow">Our Story</span>
            <h2 className="section-title mt-3">Building Digital Futures Since Day One</h2>
            <p className="text-ink-muted mt-4 leading-relaxed">
              Connect2Creovox was founded with a single mission: to give businesses of all sizes
              access to world-class branding, technology and marketing under one roof. We believe
              every great business deserves a great digital presence.
            </p>
            <ul className="mt-8 space-y-3">
              {["End-to-end creative and tech solutions","Pan-India vehicle & outdoor advertising","Custom ERP, CRM & mobile applications","Performance-driven digital marketing"].map((item) => (
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
              <div key={i} className="card p-6 text-center">
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
);

export default About;