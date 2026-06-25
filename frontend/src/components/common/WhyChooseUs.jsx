import { motion } from "framer-motion";
import { FaRocket, FaPalette, FaCode, FaHeadset, FaCheckCircle } from "react-icons/fa";
import SectionPeep from "./SectionPeep";


const features = [
  { icon: <FaRocket />,   title: "Fast Delivery",      desc: "Quick turnaround without compromising on quality or craft.",   color: "from-orange-400 to-amber-300" },
  { icon: <FaPalette />,  title: "Creative Design",    desc: "Unique branding that makes you stand out in any crowded market.", color: "from-brand-500 to-pink-400" },
  { icon: <FaCode />,     title: "Scalable Solutions", desc: "Future-ready technology built for long-term business growth.",   color: "from-violet-500 to-purple-400" },
  { icon: <FaHeadset />,  title: "Dedicated Support",  desc: "Reliable, responsive assistance whenever you need it.",           color: "from-teal-500 to-cyan-400" },
];

const WhyChooseUs = () => (
  <section className="section" style={{ background: "#faf6f0" }}>
    
    <div className="max-w-7xl mx-auto px-5 sm:px-8">

      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="text-center mb-16"
      >
       <div className="flex justify-center">

    <div className="relative inline-block">

      <SectionPeep
        size={175}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          -top-[130px]
          z-10
        "
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
            className="group card p-7 text-center"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
              {f.icon}
            </div>
            <h3 className="font-bold text-ink mb-3">{f.title}</h3>
            <p  className="text-ink-muted text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-100 rounded-2xl overflow-hidden shadow-brand-sm"
      >
        {[
          { n: "200+", label: "Projects Delivered" },
          { n: "50+",  label: "Happy Clients" },
          { n: "2+",   label: "Years Experience" },
          { n: "24/7", label: "Support Available" },
        ].map((s, i) => (
          <div key={i} className="bg-white py-8 text-center">
            <p className="text-3xl font-extrabold gradient-text">{s.n}</p>
            <p className="text-ink-muted text-sm mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default WhyChooseUs;