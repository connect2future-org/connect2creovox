import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPaintBrush, FaExpandArrowsAlt, FaClock } from "react-icons/fa";
import creativeStudioCard from "../../assets/creative-studio-card.png";
import peepingMale from "../../assets/characters/peeping_male.png";



const fadeLeft  = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const fadeRight = { hidden: { opacity: 0, x:  50 }, show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } } };

const HeroSection = () => {
  const badges = [
    { icon: FaPaintBrush,      label: "Modern Design",      sub: "Clean & Aesthetic" },
    { icon: FaExpandArrowsAlt, label: "Scalable Solutions", sub: "Built for Growth" },
    { icon: FaClock,           label: "Timely Delivery",    sub: "On Time, Every Time" },
  ];

  return (
    <section className="hero-bg relative min-h-screen flex items-center overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <motion.div variants={fadeLeft} initial="hidden" animate="show">

            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-brand-200 bg-brand-50 text-brand-600 text-xs font-bold tracking-wider uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
              We Build Digital Possibilities
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="font-extrabold text-ink leading-[1.07]"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)", letterSpacing: "-2px" }}
            >
              Innovative Solutions.
              <br />
              <span className="gradient-text">Real Impact.</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.6 }}
              className="mt-6 text-ink-muted leading-relaxed max-w-[520px]"
              style={{ fontSize: "1.05rem" }}
            >
              Connect2Creovox helps businesses grow with stunning websites,
              powerful software and impactful branding.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Link to="/services" className="btn btn-primary">
                Explore Services <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us <FaArrowRight />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              {badges.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                    <Icon className="text-brand-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink leading-none">{label}</p>
                    <p className="text-xs text-ink-subtle mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* ── RIGHT – Creative Studio card ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-[28px] blur-3xl opacity-30 pointer-events-none"
                   style={{ background: "linear-gradient(135deg,#f9a8d4,#ec4899,#a855f7)" }} />
              {/* Peeping Mascot */}

<motion.img
  src={peepingMale}
  alt="Mascot"
  initial={{
    opacity: 0,
    x: 30,
  }}
  animate={{
    opacity: 1,
    x: 0,
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
  }}
  transition={{
    duration: 0.8,
    delay: 0.5,
    y: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
    rotate: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="
    absolute
    top-24
    -left-28
    w-56
    z-20
    pointer-events-none
    select-none
  "
/>
              <motion.img
                src={creativeStudioCard}
                alt="Creative Studio – Connect2Creovox"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="
                relative
                z-30
                w-full
                max-w-[400px]
                xl:max-w-[440px]
                rounded-[28px]
                shadow-2xl
                border
                border-white/60
                "
                style={{ filter: "drop-shadow(0 32px 64px rgba(236,72,153,0.2))" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;