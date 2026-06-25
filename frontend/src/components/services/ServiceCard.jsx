import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import {
  FaCar, FaBus, FaMobileAlt, FaBuilding, FaGlobe, FaCode,
  FaShoppingCart, FaBullhorn, FaDatabase, FaUsers, FaMobile,
  FaFilm, FaWifi, FaTv, FaTint,
} from 'react-icons/fa';

const iconMap = {
  FaCar, FaBus, FaMobileAlt, FaBuilding, FaGlobe, FaCode,
  FaShoppingCart, FaBullhorn, FaDatabase, FaUsers, FaMobile,
  FaFilm, FaWifi, FaTv, FaTint,
};

const ServiceCard = ({ service, index }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const navigate = useNavigate();
  const Icon = iconMap[service.iconName] || FaGlobe;
  const images = service.images || [];

  const next = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentImg((p) => (p + 1) % images.length);
    },
    [images.length]
  );

  const prev = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentImg((p) => (p - 1 + images.length) % images.length);
    },
    [images.length]
  );

  // Auto-advance every 3s
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, images.length]);

  const isCustom = service.price === 'Custom Quote';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/services/${service.id}`)}
      className="service-card group cursor-pointer overflow-hidden rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image Slider */}
      <div className="relative h-60 overflow-hidden rounded-t-2xl bg-white flex items-center justify-center">
        {images.map((src, i) => (
          <img
          key={i}
          src={src}
          alt={service.title}
          className={`absolute inset-0 w-full h-full object-contain p-3 transition-opacity duration-700 ${
          i === currentImg ? 'opacity-100' : 'opacity-0'
          }`}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Nav buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentImg ? 'bg-pink-500 w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Pink icon badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-2.5 shadow-lg">
          <Icon className="text-base" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-1 leading-tight">{service.title}</h3>

        <div className={`text-sm font-semibold mb-2 ${isCustom ? 'text-pink-500' : 'text-pink-500'}`}>
          {service.price}
          {!isCustom && service.priceNote && (
            <span className="text-gray-400 font-normal text-xs ml-1"></span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{service.category}</span>
          <span className="text-pink-500 group-hover:translate-x-1 transition-transform">
            <FaArrowRight className="text-xs" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
