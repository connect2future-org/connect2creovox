import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaCode, FaPalette, FaBullhorn, FaArrowRight } from "react-icons/fa";
import SectionPeep from "./SectionPeep";


const services = [
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    desc:  "Responsive websites, dynamic web apps and e-commerce solutions engineered for performance and scalability.",
    link:  "/services?category=web-development",
    accent:"from-sky-500 to-cyan-400",
    bg:    "bg-sky-50",
  },
  {
    icon: <FaCode />,
    title: "Software Solutions",
    desc:  "Custom ERP, CRM and business automation systems that streamline operations and accelerate growth.",
    link:  "/services?category=software",
    accent:"from-violet-500 to-purple-400",
    bg:    "bg-violet-50",
  },
  {
    icon: <FaPalette />,
    title: "Branding & Design",
    desc:  "Creative branding, vehicle advertising, visual identity systems and impactful marketing designs.",
    link:  "/services?category=branding",
    accent:"from-brand-500 to-pink-400",
    bg:    "bg-brand-50",
  },
  {
    icon: <FaBullhorn />,
    title: "Digital Marketing",
    desc:  "Performance-driven digital campaigns, social media management and lead generation strategies.",
    link:  "/services?category=digital-marketing",
    accent:"from-orange-500 to-amber-400",
    bg:    "bg-orange-50",
  },
];

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const itemV = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

const ServicesSection = () => (
  <section className="section bg-white relative overflow-hidden">
    
    {/* subtle blobs */}
    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-brand-100 blur-3xl opacity-40 pointer-events-none" />
    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-violet-100 blur-3xl opacity-30 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
          <div className="flex justify-center mb-8">

            <div className="relative inline-flex items-center justify-center">

              <SectionPeep
                size={175}
                className="
                  absolute
                  left-1/2
                  -translate-x-[46%]
                  -top-[112px]
                  z-10
                "
              />

              <span className="section-eyebrow relative z-20">
                What We Do
              </span>

            </div>

          </div>
       
        
        <h2 className="section-title mt-5">
          Solutions Built For<br />
          <span className="gradient-text">Modern Businesses</span>
        </h2>
        <p className="section-subtitle mx-auto mt-5">
          From branding and digital marketing to software engineering and web development —
          Connect2Creovox delivers complete creative-tech solutions under one roof.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={itemV}
            className="group card card-brand-top flex flex-col p-7"
          >
            {/* Icon */}
            <div
              className="
              w-10 h-10
              rounded-2xl
              bg-pink-50
              flex
              items-center
              justify-center
              text-pink-500
              text-2xl
              mb-6
              transition-all
              duration-300
              group-hover:bg-pink-500
              group-hover:text-white
              group-hover:shadow-lg
              "
            >
              <span className={`bg-gradient-to-br ${s.accent} bg-clip-text`}
                    style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.icon}
              </span>
            </div>

            <h3 className="text-lg font-bold text-ink mb-3">{s.title}</h3>
            <p  className="text-ink-muted text-sm leading-relaxed flex-grow">{s.desc}</p>

            <Link to={s.link}
              className="mt-6 inline-flex items-center gap-2 text-brand-500 font-semibold text-sm group-hover:gap-2.5 transition-all"
            >
              Explore <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default ServicesSection;