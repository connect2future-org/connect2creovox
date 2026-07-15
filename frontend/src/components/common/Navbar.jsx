import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdLogout, MdLogin, MdPersonAdd } from "react-icons/md";
import Logo from "./Logo";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout }        = useContext(AuthContext);
  const navigate                = useNavigate();
  const location                = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/"); };

  const links = [
    { name: "Home",     path: "/" },
    { name: "Services", path: "/services" },
    { name: "Franchise", path: "/franchise" },
    { name: "About",    path: "/about" },
    { name: "Contact",  path: "/contact" },
  ];

  const isActive = (p) => {
    if (p === "/") return location.pathname === "/";
    if (p === "/franchise") {
      return location.pathname.startsWith("/services/franchise-modules");
    }
    if (location.pathname.startsWith("/services/franchise-modules")) return false;
    return location.pathname.startsWith(p);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${scrolled ? "navbar-blur" : "bg-white/90 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] md:h-[70px]">

          {/* Logo – shifted down for vertical alignment */}
          <div className="flex-shrink-0 flex items-center -ml-2 md:-ml-4 translate-y-[8px]">
            <Logo className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto" />
          </div>

          {/* Desktop Navigation – centered */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {links.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                className={`nav-link ${isActive(l.path) ? "active" : ""}`}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth – pushed far right */}
          <div className="hidden lg:flex items-center gap-2 ml-4 xl:ml-8">
            {user ? (
              <>
                <NotificationBell />
                <Link
                  to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                  className="btn btn-ghost text-sm px-3 py-2 flex items-center gap-1"
                >
                  <MdDashboard className="text-base" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary text-sm px-4 py-2 flex items-center gap-1"
                >
                  <MdLogout /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline text-sm px-4 py-2 flex items-center gap-1">
                  <MdLogin /> Login
                </Link>
                <Link to="/register" className="btn btn-primary text-sm px-4 py-2 flex items-center gap-1">
                  <MdPersonAdd /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger – always on the right */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-700 text-xl p-2 rounded-xl hover:bg-pink-50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer – unchanged */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white border-t border-pink-50 shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.name}
                  to={l.path}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                    isActive(l.path) ? "bg-pink-50 text-brand-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {l.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                      className="btn btn-outline text-sm text-center justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <MdDashboard className="mr-2" /> Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="btn btn-primary text-sm justify-center"
                    >
                      <MdLogout className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline text-sm text-center justify-center" onClick={() => setIsOpen(false)}>
                      <MdLogin className="mr-2"/>Login
                    </Link>
                    <Link to="/register" className="btn btn-primary text-sm text-center justify-center" onClick={() => setIsOpen(false)}>
                      <MdPersonAdd className="mr-2"/>Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;