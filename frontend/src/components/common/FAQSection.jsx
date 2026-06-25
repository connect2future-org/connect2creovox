import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  { q: "How long does a project take?",       a: "Most projects are completed within 2–8 weeks depending on scope and complexity. We agree on timelines before work begins." },
  { q: "Do you redesign existing websites?",  a: "Yes, we modernize websites with fresh, conversion-focused designs while preserving your brand identity and SEO rankings." },
  { q: "Do you provide ongoing support?",     a: "Absolutely. We offer flexible ongoing support and maintenance packages for all our services after delivery." },
  { q: "Can you build custom software?",      a: "Yes, we develop fully tailored software — from ERP systems to mobile apps — built around your exact business workflow." },
  { q: "What industries do you serve?",       a: "We work across all industries including retail, healthcare, real estate, education, logistics, and professional services." },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" style={{ background: "#faf6f0" }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title mt-5">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              className="faq-item"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-semibold text-ink text-sm">{f.q}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${open === i ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-500"}`}>
                  {open === i ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-ink-muted text-sm leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;