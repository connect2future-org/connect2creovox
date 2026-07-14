import { useRef, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { services } from '../../data/servicesData';

// Collect unique images
const allImages = services
  .filter(s => s.images && s.images.length > 0)
  .flatMap(s => s.images)
  .filter((v, i, a) => a.indexOf(v) === i)
  .slice(0, 20);

const imageSet = [...allImages, ...allImages, ...allImages];

const HeroShowcaseBackground = () => {
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useEffect(() => {
    const anim1 = animate(layer1Ref.current, { x: ['0%', '-50%'] }, { duration: 60, ease: 'linear', repeat: Infinity });
    const anim2 = animate(layer2Ref.current, { x: ['0%', '-50%'] }, { duration: 45, ease: 'linear', repeat: Infinity });
    const anim3 = animate(layer3Ref.current, { x: ['0%', '-50%'] }, { duration: 35, ease: 'linear', repeat: Infinity });

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        // Dome: starts flat at the top, curves down and out
        clipPath: 'ellipse(140% 70% at 50% 0%)',
        WebkitClipPath: 'ellipse(140% 70% at 50% 0%)',
      }}
    >
      {/* Glass base */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-[50%] shadow-2xl border border-white/20" />

      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-[50%] p-[2px] bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-blue-400/30 animate-gradient-xy"
        style={{ backgroundSize: '400% 400%' }}
      >
        <div className="w-full h-full rounded-[50%] bg-transparent" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Image layers – constrained inside the dome */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layer 1 – back */}
        <div ref={layer1Ref} className="flex gap-8 w-max opacity-30 blur-[6px] scale-90">
          {imageSet.map((src, i) => (
            <div key={i} className="w-40 h-28 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg flex-shrink-0 overflow-hidden">
              <img src={src} alt="service" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Layer 2 – middle */}
        <div ref={layer2Ref} className="flex gap-8 w-max opacity-50 blur-[3px] scale-95 mt-8">
          {imageSet.map((src, i) => (
            <div key={i} className="w-44 h-32 rounded-xl bg-white/20 backdrop-blur-sm border border-white/15 shadow-lg flex-shrink-0 overflow-hidden">
              <img src={src} alt="service" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Layer 3 – front */}
        <div ref={layer3Ref} className="flex gap-8 w-max opacity-70 blur-[1px] scale-100 mt-16">
          {imageSet.map((src, i) => (
            <div key={i} className="w-48 h-36 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-lg flex-shrink-0 overflow-hidden">
              <img src={src} alt="service" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroShowcaseBackground;