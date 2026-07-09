import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft, FaCheckCircle, FaChevronLeft, FaChevronRight,
  FaWhatsapp, FaEye, FaMobileAlt, FaMoneyBillWave, FaMapMarkerAlt,
} from 'react-icons/fa';
import {
  FaCar, FaBus, FaBuilding, FaGlobe, FaCode,
  FaShoppingCart, FaBullhorn, FaDatabase, FaUsers, FaMobile,
  FaFilm, FaWifi, FaTv, FaTint,
} from 'react-icons/fa';
import { services } from '../data/servicesData';

const iconMap = {
  FaCar, FaBus, FaMobileAlt, FaBuilding, FaGlobe, FaCode,
  FaShoppingCart, FaBullhorn, FaDatabase, FaUsers, FaMobile,
  FaFilm, FaWifi, FaTv, FaTint,
};

// Map highlight label -> icon
const highlightIconMap = {
  'High Visibility': FaEye,
  'Mobile Advertising': FaMobileAlt,
  'Cost Effective': FaMoneyBillWave,
  'Wide Reach': FaMapMarkerAlt,
  'Daily Campaigns': FaEye,
  'Zone Targeting': FaMapMarkerAlt,
  'Flexible Duration': FaMoneyBillWave,
  'High Impressions': FaEye,
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [currentImg, setCurrentImg] = useState(0);

  const images = service?.images || [];

  const next = useCallback(() => setCurrentImg((p) => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrentImg((p) => (p - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next, images.length]);

  if (!service) {
    return (
      <div className="pt-24 pb-14 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-500">Service not found</h2>
        <Link to="/services" className="text-pink-500 hover:underline mt-4 inline-block">
          ← Back to Services
        </Link>
      </div>
    );
  }

  const Icon = iconMap[service.iconName] || FaGlobe;
  const isCustom = service.price === 'Custom Quote';
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in your ${service.title} service. Please share more details.`);

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ background: '#fffaf5' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Back button */}
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT – Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Price badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-4 shadow-md shadow-pink-200">
              {isCustom ? 'Custom Quote' : `Starting from ${service.price}`}
            </div>

            {/* Main slider */}
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 bg-gray-100 shadow-lg">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full object-contain bg-white p-4 transition-opacity duration-700 ${
 i === currentImg
 ? "opacity-100"
 : "opacity-0"
}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 shadow-md z-10 transition"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 shadow-md z-10 transition"
                  >
                    <FaChevronRight />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentImg ? 'bg-pink-500 w-5' : 'bg-white/70 w-1.5'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Highlights row */}
            <div className="flex flex-wrap gap-4 mt-6">
              {(service.highlights || []).map((h, i) => {
                const HIcon = highlightIconMap[h] || FaEye;
                return (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="bg-pink-100 text-pink-500 rounded-full p-1.5">
                      <HIcon className="text-xs" />
                    </span>
                    {h}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT – Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-3 shadow-md shadow-pink-200">
                  <Icon className="text-xl" />
                </div>
                <span className="text-pink-500 text-sm font-semibold uppercase tracking-widest">
                  {service.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {service.title.split(' ').map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="gradient-text"> {word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h1>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-5 border border-pink-50 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">About Service</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.about}</p>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-5 border border-pink-50 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(service.features || []).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCheckCircle className="text-pink-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing card + CTA */}
            <div className="bg-white rounded-2xl p-5 border border-pink-50 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Pricing</p>
                  <p className="text-xs text-gray-400 mb-0.5">
                    {isCustom ? '' : 'Starting from'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
  to={`/book-service/${service.id}`}
  className="
  gradient-bg
  text-white
  px-6
  py-2.5
  rounded-xl
  font-semibold
  hover:opacity-90
  transition
  text-center
  text-sm
  "
  style={{
    background:
      "linear-gradient(135deg,#ec4899,#db2777)"
  }}
>
  Book Service
</Link>
                  <a
                    href={`https://wa.me/919540944463?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold transition text-sm"
                  >
                    <FaWhatsapp /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery */}
        {service.gallery && service.gallery.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {service.gallery.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden h-36 bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-contain p-2 bg-white hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-14 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}>
          <div>
            <h3 className="text-white text-2xl font-bold mb-1">Ready to Boost Your Brand?</h3>
            <p className="text-pink-100 text-sm">Get a customized solution for your business</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
  to={`/book-service/${service.id}`}
  className="
  bg-white
  text-pink-600
  px-6
  py-2.5
  rounded-xl
  font-semibold
  hover:bg-pink-50
  transition
  text-sm
  "
>
  Book Service
</Link>
            <a
              href={`https://wa.me/919540944463?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold transition text-sm"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;
