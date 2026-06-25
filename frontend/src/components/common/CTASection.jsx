import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SectionPeep from "./SectionPeep";


const CTASection = () => (
  <section className="section-sm bg-white px-5 sm:px-8">
    <div className="max-w-7xl mx-auto">
      
      <motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65 }}
  viewport={{ once: true }}
  className="
relative
cta-section
px-8
md:px-16
py-16
flex
flex-col
md:flex-row
items-center
justify-between
gap-10
overflow-visible
"
>
  {/* ===== Female Peeping Character ===== */}
  <div
    className="
      absolute
      left-1/2
      -translate-x-1/2
      -top-[143px]
      z-30
    "
  >
    <SectionPeep size={190} />
  </div>

  {/* ===== Left Content ===== */}
  <div className="relative z-10 text-center md:text-left">

    <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
      Ready to start?
    </p>

    <h2
      className="text-white font-extrabold leading-tight"
      style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}
    >
      Ready to Bring Your
      <br />
      Ideas to Life?
    </h2>

    <p className="text-white/75 mt-3 text-sm max-w-md">
      Let's build something extraordinary together.
      One studio for your entire digital ecosystem.
    </p>

  </div>

  {/* ===== Right Buttons ===== */}
  <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">

    <Link
      to="/contact"
      className="btn btn-white text-sm px-7 py-3.5 shadow-xl"
    >
      Get In Touch <FaArrowRight />
    </Link>

    <a
      href="https://wa.me/917019436720"
      target="_blank"
      rel="noopener noreferrer"
      className="btn text-sm px-7 py-3.5 bg-white/15 text-white border border-white/30 hover:bg-white/25 transition-colors"
    >
      <FaWhatsapp className="text-lg" />
      WhatsApp Us
    </a>

  </div>
</motion.div>
    </div>
  </section>
);

export default CTASection;