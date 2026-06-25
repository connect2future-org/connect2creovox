import { motion } from "framer-motion";
import { FaComments, FaLightbulb, FaPencilRuler, FaRocket } from "react-icons/fa";
import SectionPeep from "./SectionPeep";



const steps = [
  { n: "01", icon: <FaComments />,    title: "Discover",         desc: "We understand your goals, audience and requirements deeply." },
  { n: "02", icon: <FaLightbulb />,   title: "Plan",             desc: "We strategize and create a clear roadmap for success." },
  { n: "03", icon: <FaPencilRuler />, title: "Design & Develop", desc: "We design, build and refine with precision and passion." },
  { n: "04", icon: <FaRocket />,      title: "Deliver",          desc: "We test, launch and support your growth journey." },
];

const ProcessSection = () => (
  <section className="section bg-white">
   
    <div className="max-w-7xl mx-auto px-5 sm:px-8">

      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="flex justify-center">

    <div className="relative inline-block">

      <SectionPeep
        size={175}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          -top-[120px]
          z-10
        "
      />

      <span className="section-eyebrow">Our Process</span>

    </div>

  </div>
        
        <h2 className="section-title mt-5">
          How We <span className="gradient-text">Work</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          A simple, transparent process to turn ideas into powerful digital products.
        </p>
      </motion.div>

      <div className="relative grid lg:grid-cols-4 gap-10">

        {/* Connector */}
        <div className="hidden lg:block process-connector" />

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.55 }} viewport={{ once: true }}
            className="relative z-10 flex flex-col items-center text-center group"
          >
            {/* Circle */}
            <div className="w-24 h-24 rounded-full bg-white border-2 border-brand-200 shadow-brand-sm
                            flex flex-col items-center justify-center mb-6
                            group-hover:border-brand-500 group-hover:shadow-brand-md
                            group-hover:bg-brand-gradient transition-all duration-400">
              <span className="text-[10px] font-bold text-brand-400 group-hover:text-white mb-1 transition-colors">{s.n}</span>
              <span className="text-brand-500 text-2xl group-hover:text-white transition-colors">{s.icon}</span>
            </div>

            <h3 className="font-bold text-ink mb-2">{s.title}</h3>
            <p  className="text-ink-muted text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default ProcessSection;