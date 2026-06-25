import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBullhorn,
  FaPalette,
  FaLaptopCode,
  FaPaintBrush,
  FaFilm,
  FaShareAlt,
} from "react-icons/fa";

const services = [
  "Social Media Marketing",
  "Digital Marketing",
  "Brand Identity",
  "Digital Design",
  "Print Design",
  "Motion Graphics",
];

const CreativeStudioCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
        bg-white
        rounded-[32px]
        shadow-2xl
        overflow-hidden
        border
        border-pink-100
        max-w-[520px]
      "
    >
      {/* Top Gradient */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-white">
        <h2 className="text-5xl font-black leading-none">
          Creative
          <br />
          Studio
        </h2>

        <p className="mt-4 text-white/90 text-lg">
          Elevate Your Brand with Exceptional Design
        </p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-3 p-5">
        <img
          src="/creative/design1.jpg"
          alt=""
          className="rounded-2xl h-44 w-full object-cover"
        />

        <img
          src="/creative/design2.jpg"
          alt=""
          className="rounded-2xl h-44 w-full object-cover"
        />
      </div>

      {/* Services */}
      <div className="p-6">
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <FaShareAlt className="text-pink-500 text-xl" />
            <span>Social Media Marketing</span>
          </div>

          <div className="flex items-center gap-3">
            <FaBullhorn className="text-pink-500 text-xl" />
            <span>Digital Marketing</span>
          </div>

          <div className="flex items-center gap-3">
            <FaPalette className="text-pink-500 text-xl" />
            <span>Brand Identity</span>
          </div>

          <div className="flex items-center gap-3">
            <FaLaptopCode className="text-pink-500 text-xl" />
            <span>Digital Design</span>
          </div>

          <div className="flex items-center gap-3">
            <FaPaintBrush className="text-pink-500 text-xl" />
            <span>Print Design</span>
          </div>

          <div className="flex items-center gap-3">
            <FaFilm className="text-pink-500 text-xl" />
            <span>Motion Graphics</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default CreativeStudioCard;