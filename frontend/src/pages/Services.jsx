import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "../components/services/ServiceCard";
import { services, serviceCategories } from "../data/servicesData";

const Services = () => {
  const [searchParams] = useSearchParams();
  const categoryMap = { branding:"Branding", software:"Software", "web-development":"Web Development", "digital-marketing":"Digital Marketing", advertising:"Advertising" };
  const initialCat = categoryMap[searchParams.get("category")] || "All Services";
  const [active, setActive] = useState(initialCat);

  useEffect(() => {
    setActive(categoryMap[searchParams.get("category")] || "All Services");
  }, [searchParams]);

  // Only the filtering logic changes
const filtered = active === "All Services" 
  ? services.filter(s => !s.isHidden) 
  : services.filter(s => s.category === active && !s.isHidden);

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#faf6f0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="section-eyebrow">What We Offer</span>
          <h1 className="section-title mt-5">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            360° Branding, Marketing & Digital Solutions to Grow Your Business
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {serviceCategories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                active === cat
                  ? "bg-brand-500 text-white border-brand-500 shadow-brand-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-500"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-center text-ink-subtle text-sm mb-8">{filtered.length} service{filtered.length !== 1 ? "s" : ""}</p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
            {filtered.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Services;