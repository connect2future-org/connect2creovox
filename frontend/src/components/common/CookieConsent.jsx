import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto glass rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl bg-white/70 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              We use cookies to improve your experience. By continuing, you agree to our{' '}
              <Link to="/privacy" className="text-pink-500 font-semibold hover:underline">
                Privacy Policy
              </Link>.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={reject}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
              >
                Reject
              </button>
              <button
                onClick={accept}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-pink-200 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;